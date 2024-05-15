// Importing the useState hook from the React library
import { useState } from "react";

// Defining a functional component called ListGroup

interface ListGroupProps {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}
function ListGroup({ items, heading, onSelectItem }: ListGroupProps) {
  // Array of items

  // Declaring state using the useState hook, initializing selectedIndex with -1
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Returning JSX representing the component
  return (
    <>
      {/* Header */}
      <h1>{heading}</h1>

      {/* Conditional rendering based on the length of items */}
      {items.length === 0 && <p>No items found</p>}

      {/* Unordered list */}
      <ul className="list-group">
        {/* Mapping over the items array to create list items */}
        {items.map((item, index) => (
          <li
            // Conditional class based on selectedIndex
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item} // Unique key for each list item
            onClick={() => {
              // Function to update selectedIndex when an item is clicked
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            {item} {/* Item text */}
          </li>
        ))}
      </ul>
    </>
  );
}

// Exporting the ListGroup component as default
export default ListGroup;
