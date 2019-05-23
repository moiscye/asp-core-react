import React, { Component } from "react";
import { Button, Modal, Form, Input } from "semantic-ui-react";

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
    this.saveProduct = this.saveProduct.bind(this);
  }

  saveProduct() {
    if (this.props.productId === 0) {
      let product = { Name: this.props.name, Price: this.props.price };
      this.props.saveProduct(product);
    } else {
      let product = {
        id: this.props.productId,
        Name: this.props.name,
        Price: this.props.price
      };
      this.props.editProduct(product);
    }
  }

  render() {
    const { showModal } = this.props;

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
                <label>Product Name</label>
                <Input
                  name="name"
                  placeholder="Product Name"
                  value={this.props.name}
                  onChange={this.props.onValueChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Product Price</label>
                <Input
                  name="price"
                  placeholder="Product Price"
                  value={this.props.price}
                  onChange={this.props.onValueChange}
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
              onClick={this.saveProduct}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default ModalExampleDimmer;
