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
    this.saveCustomer = this.saveCustomer.bind(this);
  }

  saveCustomer() {
    if (this.props.customerId === 0) {
      let customer = { Name: this.props.name, Address: this.props.address };
      this.props.saveCustomer(customer);
    } else {
      let customer = {
        id: this.props.customerId,
        Name: this.props.name,
        Address: this.props.address
      };
      this.props.editCustomer(customer);
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
                <label>Customer Name</label>
                <Input
                  name="name"
                  placeholder="Customer Name"
                  value={this.props.name}
                  onChange={this.props.onValueChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Customer Address</label>
                <Input
                  name="address"
                  placeholder="Customer Address"
                  value={this.props.address}
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
              onClick={this.saveCustomer}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default ModalExampleDimmer;
