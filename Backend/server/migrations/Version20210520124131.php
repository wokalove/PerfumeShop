<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210520124131 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP SEQUENCE api_token_id_seq CASCADE');
        $this->addSql('DROP TABLE api_token');
        $this->addSql('ALTER TABLE transaction DROP CONSTRAINT fk_723705d167b3b43d');
        $this->addSql('DROP INDEX idx_723705d167b3b43d');
        $this->addSql('ALTER TABLE transaction ADD usr_id INT NOT NULL');
        $this->addSql('ALTER TABLE transaction DROP users_id');
        $this->addSql('ALTER TABLE transaction ADD CONSTRAINT FK_723705D1C69D3FB FOREIGN KEY (usr_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_723705D1C69D3FB ON transaction (usr_id)');
        $this->addSql('ALTER TABLE "user" ADD roles JSON NOT NULL');
        $this->addSql('ALTER TABLE "user" DROP is_admin');
        $this->addSql('ALTER TABLE "user" ALTER email TYPE VARCHAR(180)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON "user" (email)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE SEQUENCE api_token_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE api_token (id INT NOT NULL, user_entity_id INT NOT NULL, token VARCHAR(255) NOT NULL, expires_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX idx_7ba2f5eb81c5f0b9 ON api_token (user_entity_id)');
        $this->addSql('ALTER TABLE api_token ADD CONSTRAINT fk_7ba2f5eb81c5f0b9 FOREIGN KEY (user_entity_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('DROP INDEX UNIQ_8D93D649E7927C74');
        $this->addSql('ALTER TABLE "user" ADD is_admin BOOLEAN NOT NULL');
        $this->addSql('ALTER TABLE "user" DROP roles');
        $this->addSql('ALTER TABLE "user" ALTER email TYPE VARCHAR(100)');
        $this->addSql('ALTER TABLE transaction DROP CONSTRAINT FK_723705D1C69D3FB');
        $this->addSql('DROP INDEX IDX_723705D1C69D3FB');
        $this->addSql('ALTER TABLE transaction ADD users_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE transaction DROP usr_id');
        $this->addSql('ALTER TABLE transaction ADD CONSTRAINT fk_723705d167b3b43d FOREIGN KEY (users_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_723705d167b3b43d ON transaction (users_id)');
    }
}
