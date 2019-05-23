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
    this.saveStore = this.saveStore.bind(this);
  }

  saveStore() {
    if (this.props.storeId === 0) {
      let store = { Name: this.props.name, Address: this.props.address };
      this.props.saveStore(store);
    } else {
      let store = {
        id: this.props.storeId,
        Name: this.props.name,
        Address: this.props.address
      };
      this.props.editStore(store);
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
                <label>Store Name</label>
                <Input
                  name="name"
                  placeholder="Store Name"
                  value={this.props.name}
                  onChange={this.props.onValueChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Store Address</label>
                <Input
                  name="address"
                  placeholder="Store Address"
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
              onClick={this.saveStore}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default ModalExampleDimmer;
