<?php

namespace App\Models;

use CodeIgniter\Model;

class Document extends Model
{
    protected $table            = 'documents';
    protected $primaryKey       = 'id';
    protected $allowedFields    = ['mobile_number', 'file'];

}
