import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import { useState } from 'react';
import { ethers } from 'ethers';


function ProposalButton(props) {

    const [show, setShow] = useState(false);
    const [name, setName] = useState("");

    const handleClose = () => {
        setShow(false);
        setName("");
    }
    const handleShow = () => setShow(true);

    const createProposal = async () => {
        try{
            const asBytes = ethers.utils.formatBytes32String(name);
            props.electionContract.connect(props.signer).createProposal(asBytes);
        } catch(e){
            alert("Proposal name must be less than 32 characters")
        }
    }

    const handleChange = (event) => {
        setName(event.target.value);
    }

    return (
        <>
        <Button onClick={handleShow}>
          Create Proposal
        </Button>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New proposal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <label>Proposal name </label>
            <input type={"text"} value={name} onChange={handleChange}></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={createProposal}>
            Create Proposal
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    );
}

export default ProposalButton;