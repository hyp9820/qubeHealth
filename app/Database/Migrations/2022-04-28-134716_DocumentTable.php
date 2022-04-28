<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class DocumentTable extends Migration
{
    public function up()
    {
        //
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'auto_increment' => true,
            ],
            'mobile_number' => [
                'type'  => 'VARCHAR',
                'constraint' => 10,
            ],
            'file' => [
                'type'  => 'VARCHAR',
                'constraint' => 255,
            ],
            'created_at datetime default current_timestamp',
        ]);
        $this->forge->addPrimaryKey('id');
        $this->forge->addForeignKey('mobile_number', 'users', 'mobile_number', 'CASCADE', 'CASCADE');
        $this->forge->createTable('documents');
    }

    public function down()
    {
        //
        $this->forge->dropTable('documents');
    }
}
