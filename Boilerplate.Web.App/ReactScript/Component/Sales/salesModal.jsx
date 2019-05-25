import React, { Component } from "react";
import { Button, Modal, Form, Input, Dropdown } from "semantic-ui-react";

const style = {
  top: 20 + "%",
  bottom: "auto",
  position: "absolute",
  zIndex: 9000,
  left: 30 + "%"
};

class ModalExampleDimmer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      showModal,
      customerList,
      productList,
      storeList,
      currentSalesData
    } = this.props;

    let customers = customerList.map(customer => ({
      key: customer.id,
      text: customer.name,
      value: customer.name
    }));

    let products = productList.map(product => ({
      key: product.id,
      text: product.name,
      value: product.name
    }));

    let stores = storeList.map(store => ({
      key: store.id,
      text: store.name,
      value: store.name
    }));

    return (
      <div>
        <Modal
          dimmer="blurring"
          open={showModal}
          size="tiny"
          style={style}
          closeOnEscape={true}
          closeOnDimmerClick={true}
        >
          <Modal.Header>{this.props.modalName}</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>Date Sold</label>
                <Input name="date" value={currentSalesData.dateSold} />
              </Form.Field>
              <Form.Field>
                <label>Customer</label>
                <Dropdown
                  fluid
                  selection
                  dataName="customerName"
                  dataId="customerId"
                  dataList="customerList"
                  placeholder="Select Customer Name"
                  // id={currentSalesData.customerId}
                  value={currentSalesData.customerName}
                  options={customers}
                  onChange={this.props.handleDropdownChange}
                />
              </Form.Field>
              <Form.Field required>
                <label>Product Name</label>
                <Dropdown
                  fluid
                  selection
                  dataName="productName"
                  dataId="productId"
                  dataList="productList"
                  placeholder="select Product Name"
                  value={currentSalesData.productName}
                  options={products}
                  // id={currentSalesData.productId}
                  onChange={this.props.handleDropdownChange}
                />
              </Form.Field>

              <Form.Field required>
                <label>Store Name</label>
                <Dropdown
                  fluid
                  selection
                  dataName="storeName"
                  dataId="storeId"
                  dataList="storeList"
                  placeholder="select Store Name"
                  value={currentSalesData.storeName}
                  options={stores}
                  onChange={this.props.handleDropdownChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="black"
              onClick={() => {
                this.props.closeModal();
              }}
            >
              Cancel
            </Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Save"
              onClick={this.props.saveSales}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default ModalExampleDimmer;
