BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Clients" (
	"Id"	TEXT NOT NULL,
	"FullName"	TEXT,
	"Phone"	TEXT,
	"Comment"	TEXT,
	CONSTRAINT "PK_Clients" PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "Devices" (
	"Id"	TEXT NOT NULL,
	"Type"	INTEGER,
	"Brand"	TEXT,
	"Model"	TEXT,
	CONSTRAINT "PK_Devices" PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "Services" (
	"Id"	TEXT NOT NULL,
	"Name"	TEXT,
	"Price"	REAL,
	CONSTRAINT "PK_Services" PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "Specialists" (
	"Id"	TEXT NOT NULL,
	"FullName"	TEXT,
	"Comment"	TEXT,
	CONSTRAINT "PK_Specialists" PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "Items" (
	"Id"	TEXT NOT NULL,
	"Type"	TEXT,
	"DeviceId"	TEXT,
	"Title"	TEXT,
	CONSTRAINT "PK_Items" PRIMARY KEY("Id"),
	CONSTRAINT "FK_Items_Devices_DeviceId" FOREIGN KEY("DeviceId") REFERENCES "Devices"("Id") ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS "Repairs" (
	"Id"	TEXT NOT NULL,
	"User"	TEXT,
	"SpecialistId"	TEXT,
	"ClientId"	TEXT,
	"DeviceId"	TEXT,
	"Complaint"	TEXT,
	"Comment"	TEXT,
	"Discount"	REAL,
	"TotalPrice"	REAL,
	"Status"	TEXT NOT NULL,
	CONSTRAINT "PK_Repairs" PRIMARY KEY("Id"),
	CONSTRAINT "FK_Repairs_Devices_DeviceId" FOREIGN KEY("DeviceId") REFERENCES "Devices"("Id") ON DELETE SET NULL,
	CONSTRAINT "FK_Repairs_Specialists_SpecialistId" FOREIGN KEY("SpecialistId") REFERENCES "Specialists"("Id") ON DELETE SET NULL,
	CONSTRAINT "FK_Repairs_Clients_ClientId" FOREIGN KEY("ClientId") REFERENCES "Clients"("Id") ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS "Stock" (
	"Id"	TEXT NOT NULL,
	"ItemId"	TEXT NOT NULL,
	"Price"	REAL,
	"Quantity"	INTEGER,
	CONSTRAINT "PK_Stock" PRIMARY KEY("Id"),
	CONSTRAINT "FK_Stock_Items_ItemId" FOREIGN KEY("ItemId") REFERENCES "Items"("Id") ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS "Orders" (
	"Id"	TEXT NOT NULL,
	"Source"	TEXT,
	"RepairId"	TEXT,
	"ProductId"	TEXT,
	"Price"	REAL,
	"Comment"	TEXT,
	"DateOrdered"	TEXT,
	"DateEstimated"	TEXT,
	"DateRecieved"	TEXT,
	"IsProcessed"	INTEGER,
	CONSTRAINT "PK_Orders" PRIMARY KEY("Id"),
	CONSTRAINT "FK_Orders_Items_ProductId" FOREIGN KEY("ProductId") REFERENCES "Items"("Id") ON DELETE SET NULL,
	CONSTRAINT "FK_Orders_Repairs_RepairId" FOREIGN KEY("RepairId") REFERENCES "Repairs"("Id") ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS "RepairServices" (
	"Id"	TEXT NOT NULL,
	"RepairId"	TEXT,
	"ServiceId"	TEXT,
	CONSTRAINT "PK_RepairServices" PRIMARY KEY("Id"),
	CONSTRAINT "FK_RepairServices_Services_ServiceId" FOREIGN KEY("ServiceId") REFERENCES "Services"("Id") ON DELETE SET NULL,
	CONSTRAINT "FK_RepairServices_Repairs_RepairId" FOREIGN KEY("RepairId") REFERENCES "Repairs"("Id") ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS "RepairItems" (
	"Id"	TEXT NOT NULL,
	"RepairId"	TEXT,
	"ItemId"	TEXT,
	CONSTRAINT "PK_RepairItems" PRIMARY KEY("Id"),
	CONSTRAINT "FK_RepairItems_Stock_ItemId" FOREIGN KEY("ItemId") REFERENCES "Stock"("Id") ON DELETE SET NULL,
	CONSTRAINT "FK_RepairItems_Repairs_RepairId" FOREIGN KEY("RepairId") REFERENCES "Repairs"("Id") ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS "IX_Items_DeviceId" ON "Items" (
	"DeviceId"
);
CREATE INDEX IF NOT EXISTS "IX_Orders_ProductId" ON "Orders" (
	"ProductId"
);
CREATE INDEX IF NOT EXISTS "IX_Orders_RepairId" ON "Orders" (
	"RepairId"
);
CREATE INDEX IF NOT EXISTS "IX_RepairItems_ItemId" ON "RepairItems" (
	"ItemId"
);
CREATE INDEX IF NOT EXISTS "IX_RepairItems_RepairId" ON "RepairItems" (
	"RepairId"
);
CREATE INDEX IF NOT EXISTS "IX_Repairs_ClientId" ON "Repairs" (
	"ClientId"
);
CREATE INDEX IF NOT EXISTS "IX_Repairs_DeviceId" ON "Repairs" (
	"DeviceId"
);
CREATE INDEX IF NOT EXISTS "IX_Repairs_SpecialistId" ON "Repairs" (
	"SpecialistId"
);
CREATE INDEX IF NOT EXISTS "IX_RepairServices_RepairId" ON "RepairServices" (
	"RepairId"
);
CREATE INDEX IF NOT EXISTS "IX_RepairServices_ServiceId" ON "RepairServices" (
	"ServiceId"
);
CREATE UNIQUE INDEX IF NOT EXISTS "IX_Stock_ItemId" ON "Stock" (
	"ItemId"
);
COMMIT;