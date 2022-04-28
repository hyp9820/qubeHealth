<?php

namespace App\Controllers;

use App\Models\Master;
use \Config\Database;
use CodeIgniter\RESTful\ResourceController;
use Exception;

class Masters extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    public function index()
    {
        //
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function show($id = null)
    {
        //
    }

    /**
     * Return a new resource object, with default properties
     *
     * @return mixed
     */
    public function new()
    {
        //
    }

    /**
     * Create a new resource object, from "posted" parameters
     *
     * @return mixed
     */
    public function create()
    {
        //
        $rules = [
            'mobile_number' => 'required|min_length[10]|max_length[10]',
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        } else {
            try {
                $db = Database::connect();
                $phone =  $this->request->getVar('mobile_number');

                $master = [
                    'mobile_number' => $phone,
                ];

                $masterModel = new Master();
                $m = $db->table("masters")
                        ->where('mobile_number', $phone)
                        ->get()
                        ->getResultObject();
                if (empty($m)) {
                    $masterModel->save($master);
                } else {
                    $master = $m[0];
                }
                return $this->respondCreated($master, "Success");
            } catch (Exception $e) {
                return $this->failServerError($e->getMessage(), 'Server Error!');
            }
        }
    }

    /**
     * Return the editable properties of a resource object
     *
     * @return mixed
     */
    public function edit($id = null)
    {
        //
    }

    /**
     * Add or update a model resource, from "posted" properties
     *
     * @return mixed
     */
    public function update($id = null)
    {
        //
    }

    /**
     * Delete the designated resource object from the model
     *
     * @return mixed
     */
    public function delete($id = null)
    {
        //
    }
}
