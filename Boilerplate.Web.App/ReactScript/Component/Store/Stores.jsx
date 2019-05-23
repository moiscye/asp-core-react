import * as React from "react";
import { Button, Table } from "semantic-ui-react";
import ModalExampleDimmer from "./storeModal";
import ModalExampleSize from "./deleteModal";
import axios from "axios";

export default class Stores extends React.Component {
  constructor() {
    super();
    this.state = {
      storeList: [],
      showModal: false,
      modalName: "",
      showDeleteModal: false,
      storeId: 0,
      name: "",
      address: "",
      store: null
    };
    this.loadData = this.loadData.bind(this);
    this.saveStore = this.saveStore.bind(this);
    this.editStore = this.editStore.bind(this);
    this.deleteStore = this.deleteStore.bind(this);
    this.openStoreModal = this.openStoreModal.bind(this);
    this.openStoreModalEdit = this.openStoreModalEdit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    axios
      .get("/api/Stores")
      .then(res => {
        this.setState({
          storeList: res.data
        });
      })
      .catch(error => alert(error));
  }

  openStoreModal() {
    this.setState({
      showModal: true,
      name: "",
      address: "",
      modalName: "Create Store"
    });
  }
  openStoreModalEdit(store) {
    this.setState({
      showModal: true,
      storeId: store.id,
      name: store.name,
      address: store.address,
      modalName: "Edit Store"
    });
  }

  openStoreModalDelete(store) {
    this.setState({
      showDeleteModal: true,
      store: store
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

  saveStore(store) {
    let self = this;
    axios({
      method: "post",
      url: "/api/Stores",
      data: store //data: store or data:{'Name':store.name,'Address':store.address}
    })
      .then(function(response) {
        self.setState({
          showModal: false
        });
        window.location.reload();
      })
      .catch(error => alert(error));
  }

  editStore(store) {
    let self = this;
    axios({
      method: "put",
      url: "/api/Stores/" + store.id,
      data: store //data: store or data:{'Name':store.name,'Address':store.address}
    })
      .then(function(response) {
        self.setState({
          showModal: false
        });
        window.location.reload();
      })
      .catch(error => alert(error));
  }

  deleteStore(storeId) {
    let self = this;
    axios
      .delete("/api/Stores/" + storeId)

      .then(function(response) {
        self.setState({
          showDeleteModal: false
        });
        window.location.reload();
      })
      .catch(error => alert(error));
  }

  render() {
    let storeList = this.state.storeList;

    let tableData = null;

    if (storeList != "") {
      tableData = storeList.map(store => (
        <Table.Row key={store.id}>
          <Table.Cell>{store.name}</Table.Cell>
          <Table.Cell>{store.address}</Table.Cell>
          <Table.Cell>
            <Button
              color="yellow"
              // onClick={this.openStoreModalEdit.bind(this, store)}
              onClick={this.openStoreModalEdit.bind(this, store)}
            >
              <i aria-hidden="true" className="edit  icon" />
              EDIT
            </Button>
          </Table.Cell>
          <Table.Cell>
            <Button
              color="red"
              onClick={this.openStoreModalDelete.bind(this, store)}
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
        <Button primary size="large" onClick={() => this.openStoreModal()}>
          <i aria-hidden="true" className="add  icon" />
          New Store
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
        {this.state.showModal && (
          <ModalExampleDimmer
            showModal={this.state.showModal}
            closeModal={this.closeModal}
            saveStore={this.saveStore}
            editStore={this.editStore}
            onValueChange={this.onValueChange}
            name={this.state.name}
            address={this.state.address}
            storeId={this.state.storeId}
            modalName={this.state.modalName}
          />
        )}
        {this.state.showDeleteModal && (
          <ModalExampleSize
            showDeleteModal={this.state.showDeleteModal}
            store={this.state.store}
            deleteStore={this.deleteStore}
            closeDeleteModal={this.closeDeleteModal}
          />
        )}
      </div>
    );
  }
}
