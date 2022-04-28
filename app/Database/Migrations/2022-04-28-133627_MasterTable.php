<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class MasterTable extends Migration
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
            'created_at datetime default current_timestamp',
        ]);
        $this->forge->addPrimaryKey('id');
        $this->forge->createTable('masters');
    }

    public function down()
    {
        //
        $this->forge->dropTable('masters');
    }
}
