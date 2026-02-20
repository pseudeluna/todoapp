import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { 
  Container, Row, Col, Button, InputGroup, 
  FormControl, ListGroup, Modal 
} from "react-bootstrap";

const App = () => {
    const [userInput, setUserInput] = useState("");
    const [list, setList] = useState([]);
    
    // Modal State
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentEdit, setCurrentEdit] = useState({ id: null, value: "", index: null });

    const addItem = () => {
        if (userInput.trim() !== "") {
            const newItem = {
                id: Math.random(),
                value: userInput,
            };
            setList([...list, newItem]);
            setUserInput("");
        }
    };

    const deleteItem = (id) => {
        setList(list.filter((item) => item.id !== id));
    };

    // Open Modal and populate with existing data
    const openEditModal = (item, index) => {
        setCurrentEdit({ ...item, index });
        setShowEditModal(true);
    };

    // Save the changes from the Modal
    const handleSaveEdit = () => {
        const updatedList = [...list];
        updatedList[currentEdit.index].value = currentEdit.value;
        setList(updatedList);
        setShowEditModal(false);
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center text-center">
                <Col xs="auto">
                    <h1 style={{ fontWeight: "bolder" }}>TO-DO LIST</h1>
                    <hr />
                    <form onSubmit={(e) => { e.preventDefault(); addItem(); }}>
                      <InputGroup className="mb-3">
                          <FormControl
                              placeholder="Add task..."
                              size="lg"
                              value={userInput}
                              onChange={(e) => setUserInput(e.target.value)}
                          />
                          <Button variant="dark" onClick={addItem} type="submit">ADD</Button>
                      </InputGroup>
                      </form>

                    <ListGroup>
                        {list.map((item, index) => (
                            <ListGroup.Item
                                key={item.id}
                                variant="dark"
                                className="d-flex justify-content-between align-items-center mb-2"
                            >
                                {item.value}
                                <div>
                                    <Button 
                                        variant="dark" 
                                        size="sm" 
                                        className="me-2"
                                        onClick={() => deleteItem(item.id)}
                                    >
                                        Delete
                                    </Button>
                                    <Button 
                                        variant="dark" 
                                        size="sm"
                                        onClick={() => openEditModal(item, index)}
                                    >
                                        Edit
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>

            {/* EDIT MODAL SECTION */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl
                        value={currentEdit.value}
                        onChange={(e) => setCurrentEdit({ ...currentEdit, value: e.target.value })}
                        autoFocus
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSaveEdit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default App;