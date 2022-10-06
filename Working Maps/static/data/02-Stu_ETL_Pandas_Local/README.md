## Local Data ETL

In this activity, you will have the opportunity to conduct your very first ETL process!

### Instructions

* Create a `customer_db` database in pgAdmin 4, and then create the following two tables within the database:

  * A `premise` table that contains the `id`, `premise_name`, and `county_id` columns.

  * A `county` table that contains the `id`, `county_name`, `license_count`, and `county_id` columns.

  * Make sure to assign a primary key, as Pandas will not be able to do so.

* In Jupyter Notebook, perform all ETL steps.

* **Extraction**

  * Put each CSV into a Pandas DataFrame.

* **Transform**

  * Copy _only_ the columns you need into a new DataFrame.

  * Rename the columns to match the tables created in the database.

  * Handle any duplicates. 

    * **Hint:** Some locations have the same name, but each license number is unique.

  * Set the index to the previously created primary key.

* **Load**

  * Create a connection to the database.

  * Check for a successful connection to the database, and confirm that the tables have been created.

  * Append DataFrames to tables. Be sure to use the index that was set earlier.

* Confirm that the **Load** was successful by querying the database.

* Join the two tables, and select the `id` and `premise_name` from the `premise` table and the `county_name` from the `county` table.

## Reference

New York State Liquor Authority. (2013). Liquor Authority Daily List of Active Licenses API. Updated 2018. [https://data.ny.gov/Economic-Development/Liquor-Authority-Daily-List-of-Active-Licenses-API/wg8y-fzsj](https://data.ny.gov/Economic-Development/Liquor-Authority-Daily-List-of-Active-Licenses-API/wg8y-fzsj)

- - -

© 2022 Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved.
