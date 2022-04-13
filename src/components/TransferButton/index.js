import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import { useState } from 'react';
import { ethers } from 'ethers';


function TransferButton(props) {

    const [show, setShow] = useState(false);
    const [address, setAddress] = useState("");
    const [count, setCount] = useState(props.votes);


    const handleClose = () => {
        setShow(false);
        setAddress("");
        setCount(props.votes);
    }
    const handleShow = () => setShow(true);

    const transfer = async () => {
        try{
            let to = "";
            try{
                to = ethers.utils.getAddress(address);
            } catch(e){
                alert("Invalid address")
                return
            }
            const votes = ethers.BigNumber.from(count);

        
            await props.electionContract.connect(props.signer).transferVote(to, votes);
        } catch(e){
            alert("You do not have any available votes")
        }
    }

    const handleAddress = (event) => {
        setAddress(event.target.value);
    }

    const handleCount = (event) => {
        setCount(event.target.value);
    }

    return (
        <>
        <Button onClick={handleShow}>
          Transfer Votes
        </Button>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Transfer Votes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <label>Address </label>
            <input type={"text"} value={address} onChange={handleAddress} className="form-control"></input>
            <label>Votes </label>
            <input type={"number"} value={count} onChange={handleCount} className="form-control"></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={transfer}>
            Delegate Votes
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    );
}

export default TransferButton;