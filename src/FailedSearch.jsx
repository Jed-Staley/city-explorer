import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function FailedSearchAlert() {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Search Failed</Alert.Heading>
        <p>
          We were unable to find the location you entered. Try being more specific or use a different format.
        </p>
      </Alert>
    );
  }
}

export default FailedSearchAlert;