import './App.css';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { ELECTION_ABI, ELECTION_ADDRESS } from './config';
import ProposalButton from './components/ProposalButton';
import VoteButton from './components/VoteButton';
import TransferButton from './components/TransferButton';
import Button from 'react-bootstrap/Button'



function App() {
  const [signer, setSigner] = useState();
  const [account, setAccount] = useState();


  //const [boardMembers, setBoardMembers] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [votes, setVotes] = useState(0);



  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const metamask = async () => {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setSigner(signer);
    setAccount(await signer.getAddress())
    
  }

  const electionContract = new ethers.Contract(ELECTION_ADDRESS, ELECTION_ABI, provider)

  /*const getBoard = async () => {
    const bmem = await electionContract.getBoardMembers();
    setBoardMembers(bmem);
  }*/

  const getProposals = async () => {
    const propArr = await electionContract.getProposals();

    let newProposals = [];
    for (var i = 0; i < propArr.length; i++) {
      const newProp = {name: ethers.utils.parseBytes32String(propArr[i]['name']), votes: propArr[i]['voteCount'].toNumber()};
      newProposals.push(newProp);
    }
    setProposals(newProposals);
  }

  const getVotes = async () =>{
    if(signer){
      const address = await signer.getAddress();
      const v = await electionContract.votes(address);
      setVotes(v.toNumber());
    }
  }


  const registerToVote = async () => {
    try{
      await electionContract.connect(signer).registerToVote();
    } catch(e){
      alert("You have already registered for this round")
    }
  }

  useEffect(() => {
    metamask();
    //getBoard();
    getProposals();

  })


  useEffect(() => {
    getVotes();
  })



  
  return (


    <div className="App">
      <header className="App-header">
        <div className='info'>Account: {account}<br></br> Votes: {votes}</div>
        <p>Votes: {votes}</p>
        <label>Current Proposals</label>
        <ol>
        {
          proposals.map(function(prop){
            return <li key={prop.name}>{prop.name} Votes: {prop.votes}</li>
          })
        }
        </ol>

        <div className='flex'>
          <Button onClick={registerToVote}>
            Register to vote
          </Button>
          <ProposalButton electionContract={electionContract} signer={signer}/>
          <VoteButton electionContract={electionContract} signer={signer} votes={votes} proposals={proposals}/>
          <TransferButton electionContract={electionContract} signer={signer} votes={votes} proposals={proposals}/>

        </div>
      </header>
    </div>


  );
}

export default App;
