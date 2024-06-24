import React from "react";
import { Card } from "react-bootstrap";

interface Props {
  header: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const CardComponent = ({ header, title, subtitle, children }: Props) => {
  return (
    <div>
      <Card style={{ width: "20rem" }}>
        <Card.Header>{header.toUpperCase()}</Card.Header>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
          <Card.Text>{children}</Card.Text>
          {/* <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link> */}
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardComponent;
