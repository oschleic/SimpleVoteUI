import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import { useState } from 'react';
import { ethers } from 'ethers';


function VoteButton(props) {

    const [show, setShow] = useState(false);
    const [id, setid] = useState(0);
    const [count, setCount] = useState(props.votes);


    const handleClose = () => {
        setShow(false);
        setid(0);
        setCount(props.votes);
    }
    const handleShow = () => setShow(true);

    const vote = async () => {
        try{
            const propID = ethers.BigNumber.from(id);
            const votes = ethers.BigNumber.from(count);

        
            await props.electionContract.connect(props.signer).vote(propID, votes);
        } catch(e){
            alert("You do not have any available votes")
        }
    }

    const handleID = (event) => {
        setid(event.target.value);
    }

    const handleCount = (event) => {
        setCount(event.target.value);
    }

    return (
        <>
        <Button onClick={handleShow}>
          Vote
        </Button>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Vote</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                <label>Proposal name </label>
                <select value={id} onChange={handleID} className="form-select">
                    {
                        props.proposals.map(function(prop, i){
                        return <option key={prop.name} value={i}>{prop.name}</option>
                    })
                    }
                </select>
            </div>
            <label>Votes </label>
            <input type={"number"} value={count} onChange={handleCount} className="form-control"></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={vote}>
            Vote for Proposal
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    );
}

export default VoteButton;