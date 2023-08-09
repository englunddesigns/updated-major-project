-- CreateTable
CREATE TABLE "mariner" (
    "mariner_id" TEXT NOT NULL,
    "name" TEXT,
    "year_of_birth" TEXT,
    "age" TEXT,
    "place_of_birth" TEXT,
    "home_address" TEXT,

    CONSTRAINT "mariner_pkey" PRIMARY KEY ("mariner_id")
);

-- CreateTable
CREATE TABLE "mariner_employment" (
    "mariner_employment_id" TEXT NOT NULL,
    "ship_last_served" TEXT,
    "port_of_last_ship" TEXT,
    "date_of_leaving_last_ship" TEXT,
    "date_of_joining_current_ship" TEXT,
    "port_of_joining_current_ship" TEXT,
    "capacity_onboard_current_ship" TEXT,
    "date_of_leaving_current_ship" TEXT,
    "port_of_leaving_current_ship" TEXT,
    "reason_for_leaving_current_ship" TEXT,
    "signed_with_mark" TEXT,
    "comments" TEXT,
    "mariner_id" TEXT,
    "ship_id" TEXT,

    CONSTRAINT "mariner_employment_pkey" PRIMARY KEY ("mariner_employment_id")
);

-- CreateTable
CREATE TABLE "ship" (
    "ship_id" TEXT NOT NULL,
    "official_number" TEXT,
    "vessel_name" TEXT,
    "port_of_registry" TEXT,

    CONSTRAINT "ship_pkey" PRIMARY KEY ("ship_id")
);

-- AddForeignKey
ALTER TABLE "mariner_employment" ADD CONSTRAINT "mariner_employment_mariner_id_fkey" FOREIGN KEY ("mariner_id") REFERENCES "mariner"("mariner_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mariner_employment" ADD CONSTRAINT "mariner_employment_ship_id_fkey" FOREIGN KEY ("ship_id") REFERENCES "ship"("ship_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
