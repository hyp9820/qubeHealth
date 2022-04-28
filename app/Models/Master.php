<?php

namespace App\Models;

use CodeIgniter\Model;

class Master extends Model
{
    protected $table            = 'masters';
    protected $primaryKey       = 'id';
    protected $allowedFields    = ['mobile_number'];
}
