CREATE TABLE User (
    FirstName varchar2(40),
    LastName varchar2(40),
    Email varchar2(50) PRIMARY KEY,
    MobileNumber varchar2(10) UNIQUE,
    City varchar2(10),
    Pincode varchar2(6)
);


CREATE TABLE Hospital (
    Hid INT AUTO_INCREMENT PRIMARY KEY,
    email varchar(20) UNIQUE,
    HName VARCHAR(40),
    MobileNumber VARCHAR(10) UNIQUE,
    HImage VARCHAR(100),
    DNo VARCHAR(10),
    Street VARCHAR(20),
    City VARCHAR(10),
    Pincode VARCHAR(6)
);



CREATE TABLE BloodGroup (
    Bid INT PRIMARY KEY,
    GroupName VARCHAR(20)
);



CREATE TABLE BloodRecords (
    Hid INT,
    Bid INT,
    Quantity INT,
    FOREIGN KEY (Hid) REFERENCES Hospital(Hid),
    FOREIGN KEY (Bid) REFERENCES BloodGroup(Bid),
    PRIMARY KEY (Hid, Bid)
);


CREATE TABLE Admin(
    Username VARCHAR(40) PRIMARY KEY,
    Password VARCHAR(20)
);
