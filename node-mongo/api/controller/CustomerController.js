const Customer = require("../model/CustomerSchema");

/*
POST->save
GET->fetch
PUT->update
DELETE->delete
*/

const saveCustomer = (req, resp) => {
  const tempCustomer = new Customer({
    nic: req.body.nic,
    name: req.body.name,
    address: req.body.address,
    salary: req.body.salary,
  });
  tempCustomer
    .save()
    .then((result) => {
      resp.status(201).json({
        status: true,
        message: "Customer saved successfully",
      });
    })
    .catch((error) => {
      resp.status(500).json(error);
    });
};
const findCustomer = (req, resp) => {
  Customer.findOne({ nic: req.headers.nic })
    .then((result) => {
      if (result == null) {
        resp.status(404).json({
          status: false,
          message: "Customer not found",
        });
      } else {
        resp.status(200).json(result);
      }
    })
    .catch((error) => {
      resp.status(500).json(error);
    });
};
const updateCustomer = (req, resp) => {
  Customer.updateOne(
    { nic: req.headers.nic },
    {
      name: req.body.name,
      address: req.body.address,
      salary: req.body.salary,
    }
  )
    .then((result) => {
      if (result.modifiedCount > 0) {
        resp.status(201).json({
          status: true,
          message: "Customer updated successfully",
        });
      } else {
        resp.status(200).json({
          status: false,
          message: "Customer not updated",
        });
      }
    })
    .catch((error) => {
      resp.status(500).json(error);
    });
};
const deleteCustomer = (req, resp) => {
  Customer.deleteOne({ nic: req.headers.nic })
    .then((result) => {
      if (result.deletedCount > 0) {
        resp.status(201).json({
          status: true,
          message: "Customer deleted successfully",
        });
      } else {
        resp.status(200).json({
          status: false,
          message: "Customer not deleted",
        });
      }
    })
    .catch((error) => {
      resp.status(500).json(error);
    });
};
const findAllCustomer = (req, resp) => {
  Customer.find()
    .then((result) => {
      resp.status(200).json(result);
    })
    .catch((error) => {
      resp.status(500).json(error);
    });
};

module.exports = {
  saveCustomer,
  findCustomer,
  updateCustomer,
  deleteCustomer,
  findAllCustomer,
};
