import React, { Component } from "react";
import { Button, Modal, Container } from "semantic-ui-react";

const style = {
  top: 20 + "%",
  bottom: "auto",
  position: "absolute",
  zIndex: 9000,
  left: 30 + "%"
};

class ModalExampleSize extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { showDeleteModal } = this.props;

    return (
      <div>
        <Container>
          <Modal
            className="ui"
            dimmer="blurring"
            size="tiny"
            open={showDeleteModal}
            style={style}
            closeOnEscape={true}
            closeOnDimmerClick={true}
          >
            <Modal.Header>Delete Customer</Modal.Header>
            <Modal.Content>
              <p>
                Are you sure you want to delete{" "}
                <strong>{this.props.customer.name}</strong> ?
              </p>
            </Modal.Content>
            <Modal.Actions>
              <Button
                color="black"
                onClick={() => {
                  this.props.closeDeleteModal();
                }}
              >
                Cancel
              </Button>
              <Button
                negative
                icon="remove"
                labelPosition="right"
                content="Remove"
                onClick={() => {
                  this.props.deleteCustomer(this.props.customer.id);
                }}
              />
            </Modal.Actions>
          </Modal>
        </Container>
      </div>
    );
  }
}

export default ModalExampleSize;
