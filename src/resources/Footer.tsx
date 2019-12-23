import React from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

interface Props {
    deleteShape: () => void;
    uid: any;
}

interface State {
}


export default class Footer extends React.PureComponent<Props, State> {

    public render() {
        return (
            <>
                <div style={{width: `200px`}}>
                    <InputGroup size="sm">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm">UID:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Small" value={this.props.uid} aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>
                </div>
                <Button variant="danger" onClick={this.props.deleteShape}>Delete shape</Button>
            </>
        );
    }
}
