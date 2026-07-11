// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract SupplyChain {

    // =====================================================
    // PROJECT INFO
    // =====================================================

    string public constant PROJECT_NAME =
        "Decentralized Supply Chain Management";

    address public immutable admin;

    constructor() {
        admin = msg.sender;
    }

    // =====================================================
    // ROLES
    // =====================================================

    enum Role {
        None,
        Manufacturer,
        Inspector,
        Distributor,
        Warehouse,
        Retailer
    }

    enum InspectionReason {
        None,
        PackagingDamage,
        TemperatureViolation,
        LabelMismatch,
        PhysicalDamage,
        Expired,
        Other
    }

    // =====================================================
    // PRODUCT STATUS
    // =====================================================

    enum ProductStatus {
        Created,
        QualityChecking,
        Inspection,
        Approved,
        DistributorStage,
        WarehouseStage,
        RetailerStage,
        Delivered,
        Rejected,
        Recalled
    }

    // =====================================================
    // DOCUMENT TYPES
    // =====================================================

    enum DocumentType {
        Invoice,
        Certificate,
        Image,
        Other
    }

    // =====================================================
// STRUCTS
// =====================================================

    struct Product {

        uint256 id;

        string uid;

        string name;

        string batchNo;

        string description;

        uint256 manufactureDate;

        address manufacturer;

        address currentOwner;

        uint8 qualityScore;

        bool inspectionRequired;

        ProductStatus status;

        bool exists;

        uint256 recallTimestamp;

        string recallReason;
    }

    struct ProductHistory {

        address actor;

        string action;

        uint256 timestamp;
    }

    struct Document {

        DocumentType documentType;

        string fileName;

        string ipfsCID;

        uint256 uploadedAt;

        address uploadedBy;
    }

    struct PendingTransfer {

        address from;

        address to;

        bool exists;
    }
    struct QualityReport {

        uint8 packaging;

        uint8 labeling;

        uint8 temperature;

        uint8 physicalCondition;

        uint8 totalScore;

        bool approved;

        string remarks;

        address inspector;

        uint256 timestamp;
    }
    // =====================================================
// STATE VARIABLES
// =====================================================

    uint256 private productCounter;

    uint256 public approvedProducts;

    uint256 public rejectedProducts;

    uint256 public inspectionProducts;

    uint256 public deliveredProducts;

    uint256 public recalledProducts;

    mapping(address => Role) public roles;

    mapping(string => Product) public products;

    mapping(string => ProductHistory[]) private productHistory;

    mapping(string => Document[]) private productDocuments;

    mapping(string => QualityReport[]) private qualityReports;

    mapping(string => PendingTransfer) public pendingTransfers;

    string[] private productUIDs;
    // =====================================================
// EVENTS
// =====================================================

    event RoleAssigned(
        address indexed user,
        Role role
    );

    event ProductCreated(
        string indexed uid,
        address indexed manufacturer
    );

    event QualityChecked(
        string indexed uid,
        uint8 score
    );

    event InspectionRequired(
        string indexed uid
    );

    event ProductApproved(
        string indexed uid
    );

    event ProductRejected(
        string indexed uid
    );

    event OwnershipTransferred(
        string indexed uid,
        address indexed from,
        address indexed to
    );

    event DocumentUploaded(
        string indexed uid,
        string fileName
    );

    event InspectionCompleted(
        string indexed uid,
        uint8 score
    );

    event ProductMovedToInspection(
        string indexed uid
    );

    event QualityReportGenerated(
        string indexed uid,
        uint8 totalScore,
        bool approved
    );

    event TransferInitiated(
        string indexed uid,
        address indexed from,
        address indexed to
    );

    event TransferAccepted(
        string indexed uid,
        address indexed to
    );

    event ProductRecalled(
        string indexed uid,
        string reason
    );

   
  

// =====================================================
// PARTICIPANT EVENTS
// =====================================================

event ParticipantRegistered(
    address indexed wallet,
    string companyName,
    Role role
);

event ParticipantStatusUpdated(
    address indexed wallet,
    bool isActive
);



    // =====================================================
// MODIFIERS
// =====================================================

    modifier onlyAdmin() {

        require(msg.sender == admin, "Only admin");

        _;
    }

    modifier onlyRole(Role role) {

        require(
            roles[msg.sender] == role,
            "Access denied"
        );

        _;
    }

    modifier productExists(string memory uid) {

        require(
            products[uid].exists,
            "Product not found"
        );

        _;
    }

    // =====================================================
// ROLE MANAGEMENT
// =====================================================

    function assignRole(
        address user,
        Role role
    )
        external
        onlyAdmin
    {
        require(user != address(0), "Invalid address");
        require(role != Role.None, "Invalid role");

        roles[user] = role;

        emit RoleAssigned(user, role);
    }

    function getRole(address user)
        external
        view
        returns (Role)
    {
        return roles[user];
    }

// =====================================================
// PRODUCT MANAGEMENT
// =====================================================

function createProduct(
    string memory uid,
    string memory name,
    string memory batchNo,
    string memory description,
    uint256 manufactureDate
)
    external
    onlyRole(Role.Manufacturer)
{
    require(!products[uid].exists, "Product already exists");
    require(bytes(uid).length > 0, "UID required");

    productCounter++;

    products[uid] = Product({
        id: productCounter,
        uid: uid,
        name: name,
        batchNo: batchNo,
        description: description,
        manufactureDate: manufactureDate,
        manufacturer: msg.sender,
        currentOwner: msg.sender,
        qualityScore: 0,
        inspectionRequired: false,
        status: ProductStatus.Created,
        exists: true,
        recallReason: "",
        recallTimestamp: 0

    });
    productUIDs.push(uid);

    productHistory[uid].push(
        ProductHistory({
            actor: msg.sender,
            action: "Product Created",
            timestamp: block.timestamp
        })
    );

    emit ProductCreated(uid, msg.sender);
    }  

    function getProduct(
        string memory uid
    )
        external
        view
        productExists(uid)
        returns (Product memory)
    {
        return products[uid];
    }  

    function getProductHistory(
        string memory uid
    )
        external
        view
        productExists(uid)
        returns (ProductHistory[] memory)
    {
        return productHistory[uid];
    }

// =====================================================
// QUALITY CHECK
// =====================================================

    function qualityCheck(
        string memory uid,
        uint8 packaging,
        uint8 labeling,
        uint8 temperature,
        uint8 physicalCondition,
        string memory remarks
    )
        external
        onlyRole(Role.Inspector)
        productExists(uid)
    {
        require(packaging <= 25, "Packaging max 25");
        require(labeling <= 25, "Labeling max 25");
        require(temperature <= 25, "Temperature max 25");
        require(physicalCondition <= 25, "Physical max 25");

        Product storage product = products[uid];

        require(
            product.status == ProductStatus.Created,
            "Already inspected"
        );

        uint8 total =
            packaging +
            labeling +
            temperature +
            physicalCondition;

        bool approved = (total == 100);

        qualityReports[uid].push(
            QualityReport({
                packaging: packaging,
                labeling: labeling,
                temperature: temperature,
                physicalCondition: physicalCondition,
                totalScore: total,
                approved: approved,
                remarks: remarks,
                inspector: msg.sender,
                timestamp: block.timestamp
            })
        );

        product.qualityScore = total;

        if (approved) {
            approvedProducts++;
            product.status = ProductStatus.Approved;

            product.inspectionRequired = false;

            productHistory[uid].push(
                ProductHistory({
                    actor: msg.sender,
                    action: "Quality Approved",
                    timestamp: block.timestamp
                })
            );

            emit ProductApproved(uid);

        } else {
            inspectionProducts++;
            product.status = ProductStatus.Inspection;

            product.inspectionRequired = true;

            productHistory[uid].push(
                ProductHistory({
                    actor: msg.sender,
                    action: remarks,
                    timestamp: block.timestamp
                })
            );

            emit ProductMovedToInspection(uid);
        }

        emit QualityChecked(uid, total);

        emit QualityReportGenerated(
            uid,
            total,
            approved
        );
    }

    function inspectionResult(
        string memory uid,
        uint8 packaging,
        uint8 labeling,
        uint8 temperature,
        uint8 physicalCondition,
        string memory remarks
    )
        external
        onlyRole(Role.Inspector)
        productExists(uid)
    {
        Product storage product = products[uid];

        require(
            product.status == ProductStatus.Inspection,
            "Inspection not required"
        );

        uint8 total =
            packaging +
            labeling +
            temperature +
            physicalCondition;

        bool approved = (total == 100);

        qualityReports[uid].push(
            QualityReport({
                packaging: packaging,
                labeling: labeling,
                temperature: temperature,
                physicalCondition: physicalCondition,
                totalScore: total,
                approved: approved,
                remarks: remarks,
                inspector: msg.sender,
                timestamp: block.timestamp
            })
        );

        product.qualityScore = total;

        if (approved) {
            approvedProducts++;
            product.status = ProductStatus.Approved;

            product.inspectionRequired = false;

            productHistory[uid].push(
                ProductHistory({
                    actor: msg.sender,
                    action: "Inspection Passed",
                    timestamp: block.timestamp
                })
            );

            emit ProductApproved(uid);

        } else {
            rejectedProducts++;
            product.status = ProductStatus.Rejected;

            product.inspectionRequired = false;

            productHistory[uid].push(
                ProductHistory({
                    actor: msg.sender,
                    action: remarks,
                    timestamp: block.timestamp
                })
            );

            emit ProductRejected(uid);
        }

        emit InspectionCompleted(uid, total);
    }


// =====================================================
// OWNERSHIP TRANSFER
// =====================================================

    function initiateTransfer(
        string memory uid,
        address newOwner
    )
        external
        productExists(uid)
    {
        Product storage product = products[uid];

        require(
            product.currentOwner == msg.sender,
            "Only current owner"
        );

        require(
            newOwner != address(0),
            "Invalid address"
        );

        require(
            !pendingTransfers[uid].exists,
            "Transfer already pending"
        );

        require(
            product.status != ProductStatus.Rejected,
            "Rejected product"
        );

        Role senderRole = roles[msg.sender];
        Role receiverRole = roles[newOwner];

        if(senderRole == Role.Manufacturer){

            require(
                receiverRole == Role.Distributor,
                "Transfer only to Distributor"
            );

        }
        else if(senderRole == Role.Distributor){

            require(
                receiverRole == Role.Warehouse,
                "Transfer only to Warehouse"
            );

        }
        else if(senderRole == Role.Warehouse){

            require(
                receiverRole == Role.Retailer,
                "Transfer only to Retailer"
            );

        }
        else{

            revert("Transfer not allowed");

        }

        pendingTransfers[uid] = PendingTransfer({

            from: msg.sender,

            to: newOwner,

            exists: true

        });

        emit TransferInitiated(
            uid,
            msg.sender,
            newOwner
        );
    }

    function acceptTransfer(
        string memory uid
    )
        external
        productExists(uid)
    {
        PendingTransfer storage transfer = pendingTransfers[uid];

        require(
            transfer.exists,
            "No pending transfer"
        );

        require(
            transfer.to == msg.sender,
            "Not receiver"
        );

        Product storage product = products[uid];

        address previousOwner = product.currentOwner;

        product.currentOwner = msg.sender;

        Role role = roles[msg.sender];

        if(role == Role.Distributor){

            product.status = ProductStatus.DistributorStage;

        }
        else if(role == Role.Warehouse){

            product.status = ProductStatus.WarehouseStage;

        }
        else if(role == Role.Retailer){

            product.status = ProductStatus.RetailerStage;

        }

        productHistory[uid].push(
            ProductHistory({
                actor: msg.sender,
                action: "Transfer Accepted",
                timestamp: block.timestamp
            })
        );

        delete pendingTransfers[uid];

        emit OwnershipTransferred(
            uid,
            previousOwner,
            msg.sender
        );

        emit TransferAccepted(
            uid,
            msg.sender
        );
    }

// =====================================================
// DOCUMENT MANAGEMENT
// =====================================================

    function uploadDocument(
        string memory uid,
        DocumentType documentType,
        string memory fileName,
        string memory ipfsCID
    )
        external
        productExists(uid)
    {
        Product storage product = products[uid];

        require(
            msg.sender == product.currentOwner ||
            msg.sender == product.manufacturer,
            "Not authorized"
        );

        productDocuments[uid].push(
            Document({
                documentType: documentType,
                fileName: fileName,
                ipfsCID: ipfsCID,
                uploadedAt: block.timestamp,
                uploadedBy: msg.sender
            })
        );

        emit DocumentUploaded(uid, fileName);
    }

    function getDocuments(
        string memory uid
    )
        external
        view
        productExists(uid)
        returns (Document[] memory)
    {
        return productDocuments[uid];
    }

    function getQualityReports(
        string memory uid
    )
        external
        view
        returns (QualityReport[] memory)
    {
        return qualityReports[uid];
    }

// =====================================================
// DASHBOARD FUNCTIONS
// =====================================================

    function getProductCount()
        external
        view
        returns(uint256)
    {
        return productCounter;
    }

    function getProductStatus(
        string memory uid
    )
        external
        view
        productExists(uid)
        returns(ProductStatus)
    {
        return products[uid].status;
    }

    function getCurrentOwner(
        string memory uid
    )
        external
        view
        productExists(uid)
        returns(address)
    {
        return products[uid].currentOwner;
    }

    function getQualityScore(
        string memory uid
    )
        external
        view
        productExists(uid)
        returns(uint8)
    {
        return products[uid].qualityScore;
    }

    function requiresInspection(
        string memory uid
    )
        external
        view
        productExists(uid)
        returns(bool)
    {
        return products[uid].inspectionRequired;
    }

    function getManufacturer(
        string memory uid
    )
        external
        view
        productExists(uid)
        returns(address)
    {
        return products[uid].manufacturer;
    }

    function getMyRole()
        external
        view
        returns(Role)
    {
        return roles[msg.sender];
    }

    function getDashboardStats()
        external
        view
        returns(
            uint256 total,
            uint256 approved,
            uint256 inspection,
            uint256 rejected,
            uint256 delivered,
            uint256 recalled
        )
    {
        return (
            productCounter,
            approvedProducts,
            inspectionProducts,
            rejectedProducts,
            deliveredProducts,
            recalledProducts
        );
    }

    function getAllProducts()
        external
        view
        returns (Product[] memory)
    {
        Product[] memory allProducts = new Product[](productUIDs.length);

        for (uint256 i = 0; i < productUIDs.length; i++) {
            allProducts[i] = products[productUIDs[i]];
        }

        return allProducts;
    }


    function getAllProductUIDs()
        external
        view
        returns (string[] memory)
    {
        return productUIDs;
    }

    function recallProduct(
        string memory uid,
        string memory reason
    )
        external
        onlyAdmin
        productExists(uid)
    {
        Product storage product = products[uid];

        require(
            product.status != ProductStatus.Recalled,
            "Product already recalled"
        );

        // Update product details
        product.recallReason = reason;
        product.recallTimestamp = block.timestamp;
        product.status = ProductStatus.Recalled;

        rejectedProducts++;

        // Add history entry
        productHistory[uid].push(
            ProductHistory({
                actor: msg.sender,
                action: "Product Recalled",
                timestamp: block.timestamp
            })
        );

        emit ProductRecalled(uid, reason);
    }
}