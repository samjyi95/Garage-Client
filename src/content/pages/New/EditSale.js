import React, {useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'



const EditSale = props => {

    let initialId = props.lists.length ? props.lists[0]._id : ''

    let [ saleId, setSaleId ] = useState(props.sale._id)
    
    let [ address, setAddress ] = useState(props.sale.address)
    let [ date, setDate ] = useState(props.sale.date)
    let [ list, setList ] = useState(initialId)

    //Reactstrap states
    const [modal, setModal] = useState(false);
    const [nestedModal, setNestedModal] = useState(false);
    const [closeAll, setCloseAll] = useState(false)

    //Reactstrap functions
    const toggle = () => setModal(!modal);

    const toggleNested = () => {
      setNestedModal(!nestedModal);
      setCloseAll(false);
    }

    const toggleAll = () => {
      setNestedModal(!nestedModal);
      setCloseAll(true);
    }
    
    
    const submitEdit = e => {
        e.preventDefault()
        console.log('hitting the PUT route for editing a sale ')
        let token = localStorage.getItem('boilerToken')
        fetch(props.url + 'sale/' + saleId, {
            method: 'PUT',
            body: JSON.stringify ({
                saleId: props.sale._id,
                address,
                date
            }),
             headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
             }
        })
        .then(response => {
            console.log('sale was edited')
            setAddress('')
            setDate('')
        })
        .catch(err => {
            console.log('There was an error editing the sale')
        })
    } 

    const handleChange = e  => {
		console.log(e.target.value)
		setList(e.target.value)
    }
    
    let listz = props.lists.map((l, i) => {
		return (
             <option key={i} value = {l._id}> {l.listTitle} </option>
		)
	})

    return (
        <div>
            <Button color="danger" onClick={toggle}>Edit This Sale</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    <form onSubmit={submitEdit}>
                        <label>Date</label>
                        <input type='text' name='date' onChange={e => setDate(e.target.value)} /> 
                        <label>Address</label>
                        <input type='text' name='address' onChange={e => setAddress(e.target.value)} /> 
                        <select onChange={handleChange}> {listz} </select>
                        <button type='submit'>submit</button>
                    </form>
                    <br />
                    <Button color="success" onClick={toggleNested}>Show Nested Modal</Button>
                    <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
                        <ModalHeader>Nested Modal title</ModalHeader>
                        <ModalBody>Stuff and things</ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={toggleNested}>Done</Button>{' '}
                            <Button color="secondary" onClick={toggleAll}>All Done</Button>
                        </ModalFooter>
                    </Modal>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default EditSale