<h1>Cake Order Tracker</h1>


<h3>Layout Structure in app.tsx </h3>

app.tsx
├── OrderTracker (Main Component)
│   ├── SearchBar (Subcomponent)
│   │   ├── Input (HTML Element)
│   │   │   Purpose: Text input for searching orders by customer name
│   │   └── LoadingIndicator (Conditional Element)
│   │       Purpose: Displays "Loading orders..." when search is pending
│   └── OrderList (Subcomponent)
│       ├── OrderItem (Repeated Subcomponent for each order)
│       │   ├── CustomerName (Element)
│       │   │   Purpose: Displays the customer’s name (e.g., "John")
│       │   ├── Status (Element)
│       │   │   Purpose: Shows "Pending" or "Ready" (e.g., with a checkmark)
│       │   └── MarkAsReadyButton (HTML Button)
│       │       Purpose: Triggers the status update to "Ready"


<h3>Notes</h3>
<p>
  <ul>
    <li>
      OrderTracker: The root component in app.tsx, managing the state and logic for search and order updates using useTransition, useDeferredValue, and useOptimistic.
    </li>

    <li>
     SearchBar: Handles the search input and loading feedback.
    </li>
    <li>
      OrderList: Renders a dynamic list of OrderItem components based on fetched orders.
    </li>

    <li>
      OrderItem: A reusable component for each order, showing details and the action button.
    </li>


  </ul>
</p>
