import * as React from "react";
import { Button, Table } from "semantic-ui-react";
import ModalExampleDimmer from "./productModal";
import ModalExampleSize from "./deleteModal";
import axios from "axios";

export default class Products extends React.Component {
  constructor() {
    super();
    this.state = {
      productList: [],
      showModal: false,
      modalName: "",
      showDeleteModal: false,
      productId: 0,
      name: "",
      price: 0,
      product: null
    };
    this.loadData = this.loadData.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
    this.editProduct = this.editProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.openProductModal = this.openProductModal.bind(this);
    this.openProductModalEdit = this.openProductModalEdit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    axios
      .get("/api/Product")
      .then(res => {
        this.setState({
          productList: res.data
        });
      })
      .catch(error => alert(error));
  }

  openProductModal() {
    this.setState({
      showModal: true,
      name: "",
      price: 0,
      modalName: "Create Product"
    });
  }
  openProductModalEdit(product) {
    this.setState({
      showModal: true,
      productId: product.id,
      name: product.name,
      price: product.price,
      modalName: "Edit Product"
    });
  }

  openProductModalDelete(product) {
    this.setState({
      showDeleteModal: true,
      product: product
    });
  }

  closeModal() {
    this.setState({
      showModal: false
    });
  }
  closeDeleteModal() {
    this.setState({
      showDeleteModal: false
    });
  }

  onValueChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  saveProduct(product) {
    let self = this;
    axios({
      method: "post",
      url: "/api/Product",
      data: product //data: product or data:{'Name':product.name,'Price':product.price}
    })
      .then(function(response) {
        self.setState({
          showModal: false
        });
        window.location.reload();
      })
      .catch(error => alert(error));
  }

  editProduct(product) {
    let self = this;
    axios({
      method: "put",
      url: "/api/Product/" + product.id,
      data: product //data: product or data:{'Name':product.name,'Price':product.price}
    })
      .then(function(response) {
        self.setState({
          showModal: false
        });
        window.location.reload();
      })
      .catch(error => alert(error));
  }

  deleteProduct(productId) {
    let self = this;
    axios
      .delete("/api/Product/" + productId)

      .then(function(response) {
        self.setState({
          showDeleteModal: false
        });
        window.location.reload();
      })
      .catch(error => alert(error));
  }

  render() {
    let productList = this.state.productList;

    let tableData = null;

    if (productList != "") {
      tableData = productList.map(product => (
        <Table.Row key={product.id}>
          <Table.Cell>{product.name}</Table.Cell>
          <Table.Cell>{product.price}</Table.Cell>
          <Table.Cell>
            <Button
              color="yellow"
              // onClick={this.openProductModalEdit.bind(this, product)}
              onClick={this.openProductModalEdit.bind(this, product)}
            >
              <i aria-hidden="true" className="edit  icon" />
              EDIT
            </Button>
          </Table.Cell>
          <Table.Cell>
            <Button
              color="red"
              onClick={this.openProductModalDelete.bind(this, product)}
            >
              <i aria-hidden="true" className="trash  icon" />
              DELETE
            </Button>
          </Table.Cell>
        </Table.Row>
      ));
    }

    return (
      <div className="topSpace">
        <Button primary size="large" onClick={() => this.openProductModal()}>
          <i aria-hidden="true" className="add  icon" />
          New Product
        </Button>

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{tableData}</Table.Body>
        </Table>
        {this.state.showModal && (
          <ModalExampleDimmer
            showModal={this.state.showModal}
            closeModal={this.closeModal}
            saveProduct={this.saveProduct}
            editProduct={this.editProduct}
            onValueChange={this.onValueChange}
            name={this.state.name}
            price={this.state.price}
            productId={this.state.productId}
            modalName={this.state.modalName}
          />
        )}
        {this.state.showDeleteModal && (
          <ModalExampleSize
            showDeleteModal={this.state.showDeleteModal}
            product={this.state.product}
            deleteProduct={this.deleteProduct}
            closeDeleteModal={this.closeDeleteModal}
          />
        )}
      </div>
    );
  }
}
