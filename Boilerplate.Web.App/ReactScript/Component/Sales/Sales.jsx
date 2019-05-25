import * as React from "react";
import { Button, Table } from "semantic-ui-react";
import ModalExampleDimmer from "./salesModal";
import ModalExampleSize from "./deleteModal";
import PaginationExampleCustomization from "../pagination";
import axios from "axios";

export default class Sales extends React.Component {
  constructor() {
    super();
    this.state = {
      saleList: [],
      customerList: [],
      productList: [],
      storeList: [],
      currentSalesData: null,
      showModal: false,
      modalName: "",
      showDeleteModal: false,
      salesId: 0
    };
    this.loadData = this.loadData.bind(this);
    this.loadAll = this.loadAll.bind(this);
    this.saveSales = this.saveSales.bind(this);
    this.deleteSales = this.deleteSales.bind(this);
    this.openSalesModal = this.openSalesModal.bind(this);
    this.openSalesModalEdit = this.openSalesModalEdit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    /** New part */
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.getIdFromName = this.getIdFromName.bind(this);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
  }
  componentDidMount() {
    this.loadData(1);
    this.loadAll();
  }

  loadData(activePage) {
    axios
      .get("/api/Sales", {
        params: {
          page: activePage,
          numPerPage: 5
        }
      })
      .then(res => {
        this.setState({
          saleList: res.data
        });
      })
      .catch(error => alert(error));
  }
  loadAll() {
    axios
      .get("/api/Customers", {
        params: {
          page: -1,
          numPerPage: -1
        }
      })
      .then(res => {
        this.setState({
          customerList: res.data
        });
        // console.log(this.state.customerList);
      });

    axios
      .get("/api/Product", {
        params: {
          page: -1,
          numPerPage: -1
        }
      })
      .then(res => {
        this.setState({
          productList: res.data
        });
      });

    axios
      .get("/api/Stores", {
        params: {
          page: -1,
          numPerPage: -1
        }
      })
      .then(res => {
        this.setState({
          storeList: res.data
        });
      });
  }

  openSalesModal() {
    let today = new Date();
    this.setState({
      showModal: true,
      currentSalesData: {
        salesId: 0,
        productId: 0,
        productName: "",
        customerId: 0,
        customerName: "",
        storeId: 0,
        storeName: "",
        dateSold: today.toLocaleDateString("default")
      }, //maybe dont need this line
      modalName: "Create Sale"
    });
  }
  openSalesModalEdit(sale) {
    this.setState({
      showModal: true,
      currentSalesData: {
        salesId: sale.id,
        productId: sale.product.id,
        productName: sale.product.name,
        customerId: sale.customer.id,
        customerName: sale.customer.name,
        storeId: sale.store.id,
        storeName: sale.store.name,
        dateSold: sale.dateSold
      },
      modalName: "Edit Sale"
    });
  }

  openSalesModalDelete(sale) {
    this.setState({
      showDeleteModal: true,
      sale: sale
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

  saveSales() {
    const data = { ...this.state.currentSalesData };
    data["id"] = data["salesId"];
    if (this.state.currentSalesData.salesId === 0) delete data["id"];
    delete data["salesId"];
    delete data["customerName"];
    delete data["productName"];
    delete data["storeName"];
    const { id } = data;
    let url = "/api/Sales";
    if (id) url = `/api/Sales/${id}`;
    axios({
      method: id ? "put" : "post",
      url,
      data
    })
      .then(function(response) {
        window.location.reload();
      })
      .catch(error => alert(error));
  }

  deleteSales(id) {
    axios
      .delete("/api/Sales/" + id)
      .then(function(response) {
        window.location.reload();
      })
      .catch(error => alert(error));
  }

  /**
   * Util funtions
   */
  getIdFromName(dataList, value) {
    const list = { ...this.state[dataList] };
    const result = Object.keys(list).reduce((result, next) => {
      const currentItem = list[next];
      if (currentItem.name === value) {
        result = currentItem.id;
        return result;
      }
      return result;
    }, 0);
    return result;
  }

  /**
   * New Part
   */
  handleDropdownChange(e, { value, dataName, dataId, dataList }) {
    const id = this.getIdFromName(dataList, value);
    this.setState({
      currentSalesData: {
        ...this.state.currentSalesData,
        [dataId]: id,
        [dataName]: value
      }
    });
  }
  handlePaginationChange = (e, { activePage }) => {
    this.loadData(activePage);
  };

  render() {
    let saleList = this.state.saleList;
    let tableData = null;

    if (saleList != "") {
      tableData = saleList.map((sale, index) => (
        <Table.Row key={index}>
          <Table.Cell>{sale.customer.name}</Table.Cell>
          <Table.Cell>{sale.product.name}</Table.Cell>
          <Table.Cell>{sale.store.name}</Table.Cell>
          <Table.Cell>{sale.dateSold}</Table.Cell>
          <Table.Cell>
            <Button
              color="yellow"
              onClick={this.openSalesModalEdit.bind(this, sale)}
            >
              <i aria-hidden="true" className="edit  icon" />
              EDIT
            </Button>
          </Table.Cell>
          <Table.Cell>
            <Button color="red" onClick={() => this.openSalesModalDelete(sale)}>
              <i aria-hidden="true" className="trash  icon" />
              DELETE
            </Button>
          </Table.Cell>
        </Table.Row>
      ));
    }

    return (
      <div className="topSpace">
        <Button primary size="large" onClick={() => this.openSalesModal()}>
          <i aria-hidden="true" className="add  icon" />
          New Sale
        </Button>

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Customer</Table.HeaderCell>
              <Table.HeaderCell>Product</Table.HeaderCell>
              <Table.HeaderCell>Store</Table.HeaderCell>
              <Table.HeaderCell>Date Sold</Table.HeaderCell>
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
            handleDropdownChange={this.handleDropdownChange}
            showModal={this.state.showModal}
            closeModal={this.closeModal}
            saveSales={this.saveSales}
            modalName={this.state.modalName}
            customerList={this.state.customerList}
            productList={this.state.productList}
            storeList={this.state.storeList}
            selectedSales={this.state.selectedSales}
            currentSalesData={this.state.currentSalesData}
          />
        )}
        {this.state.showDeleteModal && (
          <ModalExampleSize
            showDeleteModal={this.state.showDeleteModal}
            sale={this.state.sale}
            deleteSale={this.deleteSale}
            closeDeleteModal={this.closeDeleteModal}
            deleteSales={this.deleteSales}
          />
        )}
      </div>
    );
  }
}
