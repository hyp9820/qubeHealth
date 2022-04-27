<?php

namespace App\Controllers;

use App\Models\Document;
use CodeIgniter\RESTful\ResourceController;
use Exception;

class Documents extends ResourceController
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
            'file' => 'uploaded[file]'
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        } else {
            try {
                $mobile_number = $this->request->getVar('mobile_number');

                // ? Get the file
                $file = $this->request->getFile('file');
                if (!$file->isValid()) {
                    return $this->fail($file->getErrorString());
                }

                // ? Write to Database
                $doc = [
                    'mobile_number' => $mobile_number,
                    'file' => $file->getName()
                ];

                $documentModel = new Document();
                $documentModel->save($doc);

                // ? Save the file
                $file->move("./assets/${mobile_number}");

                return $this->respondCreated($doc, "Document Uploaded Successfully.");
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
