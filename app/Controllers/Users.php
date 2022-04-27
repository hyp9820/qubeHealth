<?php

namespace App\Controllers;

use App\Models\User;
// use CodeIgniter\API\ResponseTrait;
use CodeIgniter\RESTful\ResourceController;
use Exception;

class Users extends ResourceController
{
    // use ResponseTrait;
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
        $rules = [
            'mobile_number' => 'required|min_length[10]|max_length[10]',
            'first_name' => 'required',
            'last_name' =>  'required'
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        } else {
            try {
                $user = [
                    'mobile_number' => $this->request->getVar('mobile_number'),
                    'first_name' => $this->request->getVar('first_name'),
                    'last_name' => $this->request->getVar('last_name')
                ];

                $userModel = new User();
                $userModel->save($user);

                return $this->respondCreated($user, "User Created Successfully.");
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
