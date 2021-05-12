<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210512174042 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE offer_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE product_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE product_base_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE transaction_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "user_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE offer (id INT NOT NULL, product_id INT NOT NULL, new_price INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_29D6873E4584665A ON offer (product_id)');
        $this->addSql('CREATE TABLE product (id INT NOT NULL, product_base_id INT NOT NULL, price INT NOT NULL, volume INT NOT NULL, added_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_D34A04ADB8BEC4F1 ON product (product_base_id)');
        $this->addSql('CREATE TABLE product_base (id INT NOT NULL, name VARCHAR(100) NOT NULL, description VARCHAR(500) NOT NULL, brand VARCHAR(100) NOT NULL, base_note VARCHAR(300) DEFAULT NULL, for_women BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE transaction (id INT NOT NULL, product_id INT NOT NULL, usr_id INT NOT NULL, product_name VARCHAR(100) NOT NULL, price INT NOT NULL, is_completed BOOLEAN NOT NULL, quantity INT NOT NULL, date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_723705D14584665A ON transaction (product_id)');
        $this->addSql('CREATE INDEX IDX_723705D1C69D3FB ON transaction (usr_id)');
        $this->addSql('CREATE TABLE "user" (id INT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, name VARCHAR(100) NOT NULL, surname VARCHAR(100) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON "user" (email)');
        $this->addSql('ALTER TABLE offer ADD CONSTRAINT FK_29D6873E4584665A FOREIGN KEY (product_id) REFERENCES product (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE product ADD CONSTRAINT FK_D34A04ADB8BEC4F1 FOREIGN KEY (product_base_id) REFERENCES product_base (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE transaction ADD CONSTRAINT FK_723705D14584665A FOREIGN KEY (product_id) REFERENCES product (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE transaction ADD CONSTRAINT FK_723705D1C69D3FB FOREIGN KEY (usr_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE offer DROP CONSTRAINT FK_29D6873E4584665A');
        $this->addSql('ALTER TABLE transaction DROP CONSTRAINT FK_723705D14584665A');
        $this->addSql('ALTER TABLE product DROP CONSTRAINT FK_D34A04ADB8BEC4F1');
        $this->addSql('ALTER TABLE transaction DROP CONSTRAINT FK_723705D1C69D3FB');
        $this->addSql('DROP SEQUENCE offer_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE product_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE product_base_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE transaction_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE "user_id_seq" CASCADE');
        $this->addSql('DROP TABLE offer');
        $this->addSql('DROP TABLE product');
        $this->addSql('DROP TABLE product_base');
        $this->addSql('DROP TABLE transaction');
        $this->addSql('DROP TABLE "user"');
    }
}
