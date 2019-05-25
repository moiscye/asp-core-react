import * as React from "react";
import { Button, Table } from "semantic-ui-react";
import ModalExampleDimmer from "./customerModal";
import ModalExampleSize from "./deleteModal";
import PaginationExampleCustomization from "../pagination";
import axios from "axios";

export default class Customers extends React.Component {
  constructor() {
    super();
    this.state = {
      customerList: [],
      showModal: false,
      modalName: "",
      showDeleteModal: false,
      customerId: 0,
      name: "",
      address: "",
      customer: null
    };
    this.loadData = this.loadData.bind(this);
    this.saveCustomer = this.saveCustomer.bind(this);
    this.editCustomer = this.editCustomer.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);
    this.openCustomerModal = this.openCustomerModal.bind(this);
    this.openCustomerModalEdit = this.openCustomerModalEdit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
  }
  componentDidMount() {
    this.loadData(1);
  }

  loadData(activePage) {
    axios
      .get("/api/Customers", {
        params: {
          page: activePage,
          numPerPage: 5
        }
      })
      .then(res => {
        this.setState({
          customerList: res.data
        });
      })
      .catch(error => alert(error));
  }

  openCustomerModal() {
    this.setState({
      showModal: true,
      name: "",
      address: "",
      modalName: "Create Customer"
    });
  }
  openCustomerModalEdit(customer) {
    this.setState({
      showModal: true,
      customerId: customer.id,
      name: customer.name,
      address: customer.address,
      modalName: "Edit Customer"
    });
  }

  openCustomerModalDelete(customer) {
    this.setState({
      showDeleteModal: true,
      customer: customer
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

  saveCustomer(customer) {
    let self = this;
    axios({
      method: "post",
      url: "/api/Customers",
      data: customer //data: customer or data:{'Name':customer.name,'Address':customer.address}
    })
      .then(function(response) {
        self.setState({
          showModal: false
        });
        window.location.reload();
      })
      .catch(error => alert(error));
  }

  editCustomer(customer) {
    let self = this;
    axios({
      method: "put",
      url: "/api/Customers/" + customer.id,
      data: customer //data: customer or data:{'Name':customer.name,'Address':customer.address}
    })
      .then(function(response) {
        self.setState({
          showModal: false
        });
        window.location.reload();
      })
      .catch(error => alert(error));
  }

  deleteCustomer(customerId) {
    let self = this;
    axios
      .delete("/api/Customers/" + customerId)

      .then(function(response) {
        self.setState({
          showDeleteModal: false
        });
        window.location.reload();
      })
      .catch(error => alert(error));
  }

  handlePaginationChange = (e, { activePage }) => {
    this.loadData(activePage);
  };

  render() {
    let customerList = this.state.customerList;

    let tableData = null;

    if (customerList != "") {
      tableData = customerList.map(customer => (
        <Table.Row key={customer.id}>
          <Table.Cell>{customer.name}</Table.Cell>
          <Table.Cell>{customer.address}</Table.Cell>
          <Table.Cell>
            <Button
              color="yellow"
              // onClick={this.openCustomerModalEdit.bind(this, customer)}
              onClick={this.openCustomerModalEdit.bind(this, customer)}
            >
              <i aria-hidden="true" className="edit  icon" />
              EDIT
            </Button>
          </Table.Cell>
          <Table.Cell>
            <Button
              color="red"
              onClick={this.openCustomerModalDelete.bind(this, customer)}
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
        <Button primary size="large" onClick={() => this.openCustomerModal()}>
          <i aria-hidden="true" className="add  icon" />
          New Customer
        </Button>

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{tableData}</Table.Body>
        </Table>
        <PaginationExampleCustomization
          handlePaginationChange={this.handlePaginationChange}
        />
        {this.state.showModal && (
          <ModalExampleDimmer
            showModal={this.state.showModal}
            closeModal={this.closeModal}
            saveCustomer={this.saveCustomer}
            editCustomer={this.editCustomer}
            onValueChange={this.onValueChange}
            name={this.state.name}
            address={this.state.address}
            customerId={this.state.customerId}
            modalName={this.state.modalName}
          />
        )}
        {this.state.showDeleteModal && (
          <ModalExampleSize
            showDeleteModal={this.state.showDeleteModal}
            customer={this.state.customer}
            deleteCustomer={this.deleteCustomer}
            closeDeleteModal={this.closeDeleteModal}
          />
        )}
      </div>
    );
  }
}
