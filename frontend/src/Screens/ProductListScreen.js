import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Modal, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { listProducts, deleteProduct } from "../actions/productActions";

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  // Modal Code
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // On Click User ID
  const [productId, setProductId] = useState("");

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo, history, successDelete]);

  const deleteHandler = () => {
    dispatch(deleteProduct(productId));
    setProductId("");
    handleClose();
  };

  const createProductHandler = (product) => {
    // Create Product
  };

  // Test Modal Code
  const modalHandler = (id) => {
    setProductId(id);
    handleShow();
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>QUANITY</th>
              <th>Delete & Edit</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>{product.countInStock}</td>
                <td>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    // onClick={handleShow}
                    onClick={() => modalHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                  <LinkContainer to={`/admin/user/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      Edit User
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
          {/* Test Modal Code */}
          <>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Remove Product</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure? Press Close to cancel.</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={deleteHandler}>
                  Remove Product
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
