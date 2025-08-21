# Event Handling - Complete Study Guide

## What is Event Handling?

Event handling is how your React components respond to user interactions and system events. Events are actions that occur in the browser - like clicks, key presses, form submissions, mouse movements, and more. React provides a powerful and consistent way to handle these events across all browsers.

### Real-Life Analogies

#### 1. Restaurant Order System
- **Event**: Customer pressing the call button
- **Event Handler**: Waiter responding to the call
- **Event Object**: Information about which table called and what they need
- **Callback**: Waiter taking action based on the request

#### 2. Car Dashboard
- **Events**: Pressing gas pedal, turning steering wheel, pressing brake
- **Event Handlers**: Engine response, wheel turning, brake system activation
- **Event Data**: How hard the pedal is pressed, which direction to turn

#### 3. Smart Home System
- **Events**: Motion detected, door opened, temperature changed
- **Event Handlers**: Lights turn on, security alert, thermostat adjustment
- **Event Information**: Which sensor triggered, timestamp, sensor data

## Event Handlers in React

React uses **SyntheticEvents** - a wrapper around native browser events that provides consistent behavior across different browsers.

### Basic Event Handler Syntax

```jsx
function BasicEventHandling() {
  // Event handler function
  const handleClick = () => {
    console.log('Button was clicked!');
  };
  
  // Inline event handler
  const handleMouseOver = () => {
    console.log('Mouse entered the area');
  };
  
  return (
    <div>
      {/* Method 1: Reference to function */}
      <button onClick={handleClick}>
        Click Me
      </button>
      
      {/* Method 2: Inline function */}
      <button onClick={() => console.log('Inline click!')}>
        Inline Handler
      </button>
      
      {/* Method 3: Function with parameters */}
      <button onClick={() => handleClick('custom message')}>
        Click with Parameter
      </button>
      
      {/* Method 4: Multiple events on same element */}
      <div 
        onClick={handleClick}
        onMouseEnter={handleMouseOver}
        onMouseLeave={() => console.log('Mouse left')}
        style={{ 
          padding: '20px', 
          border: '1px solid #ccc',
          cursor: 'pointer' 
        }}
      >
        Hover and Click Me
      </div>
    </div>
  );
}
```

### Event Handler Best Practices

```jsx
function EventHandlerBestPractices() {
  const [message, setMessage] = useState('');
  const [count, setCount] = useState(0);
  
  // ✅ Good: Extract event handlers for readability
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    console.log('Form submitted with message:', message);
  };
  
  // ✅ Good: Use descriptive names
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };
  
  // ✅ Good: Handle multiple related actions
  const handleCounterAction = (action) => {
    switch (action) {
      case 'increment':
        setCount(prev => prev + 1);
        break;
      case 'decrement':
        setCount(prev => prev - 1);
        break;
      case 'reset':
        setCount(0);
        break;
      default:
        console.warn('Unknown action:', action);
    }
  };
  
  // ✅ Good: Conditional event handling
  const handleConditionalClick = (event) => {
    if (count >= 10) {
      alert('Maximum count reached!');
      return;
    }
    handleCounterAction('increment');
  };
  
  return (
    <div className="event-examples">
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Enter a message"
        />
        <button type="submit">Submit</button>
      </form>
      
      <div className="counter">
        <p>Count: {count}</p>
        <button onClick={() => handleCounterAction('increment')}>+</button>
        <button onClick={() => handleCounterAction('decrement')}>-</button>
        <button onClick={() => handleCounterAction('reset')}>Reset</button>
        <button onClick={handleConditionalClick}>Smart Increment</button>
      </div>
    </div>
  );
}
```

## Event Object and SyntheticEvents

React wraps native events in **SyntheticEvent** objects that provide consistent properties and methods across all browsers.

### Understanding the Event Object

```jsx
function EventObjectExploration() {
  const [eventInfo, setEventInfo] = useState(null);
  
  const handleDetailedClick = (event) => {
    // SyntheticEvent properties
    const eventDetails = {
      // Event type and target
      type: event.type,                    // 'click'
      target: event.target.tagName,        // Element that triggered event
      currentTarget: event.currentTarget.tagName, // Element with event listener
      
      // Mouse position
      clientX: event.clientX,              // X coordinate relative to viewport
      clientY: event.clientY,              // Y coordinate relative to viewport
      screenX: event.screenX,              // X coordinate relative to screen
      screenY: event.screenY,              // Y coordinate relative to screen
      
      // Modifier keys
      ctrlKey: event.ctrlKey,              // Was Ctrl key pressed?
      shiftKey: event.shiftKey,            // Was Shift key pressed?
      altKey: event.altKey,                // Was Alt key pressed?
      metaKey: event.metaKey,              // Was Meta/Cmd key pressed?
      
      // Mouse button
      button: event.button,                // Which mouse button (0=left, 1=middle, 2=right)
      buttons: event.buttons,              // Bitmask of buttons pressed
      
      // Timing
      timeStamp: event.timeStamp,          // When event occurred
      
      // Propagation
      bubbles: event.bubbles,              // Does event bubble?
      cancelable: event.cancelable,        // Can event be cancelled?
      
      // Native event access
      nativeEvent: event.nativeEvent.constructor.name
    };
    
    setEventInfo(eventDetails);
    console.log('Full event object:', event);
  };
  
  const handleKeyboardEvent = (event) => {
    const keyInfo = {
      type: event.type,
      key: event.key,                      // Key value ('a', 'Enter', 'ArrowUp')
      code: event.code,                    // Physical key ('KeyA', 'Enter', 'ArrowUp')
      keyCode: event.keyCode,              // Numeric key code (deprecated)
      charCode: event.charCode,            // Character code (deprecated)
      repeat: event.repeat,                // Is key being held down?
      
      // Modifier keys
      ctrlKey: event.ctrlKey,
      shiftKey: event.shiftKey,
      altKey: event.altKey,
      metaKey: event.metaKey
    };
    
    console.log('Key event:', keyInfo);
  };
  
  const handleFormEvent = (event) => {
    const formInfo = {
      type: event.type,
      targetType: event.target.type,
      targetName: event.target.name,
      targetValue: event.target.value,
      targetChecked: event.target.checked,
      targetSelected: event.target.selected
    };
    
    console.log('Form event:', formInfo);
  };
  
  return (
    <div className="event-exploration">
      <h2>Event Object Exploration</h2>
      
      <section>
        <h3>Mouse Events</h3>
        <button 
          onClick={handleDetailedClick}
          onMouseDown={handleDetailedClick}
          onMouseUp={handleDetailedClick}
          onDoubleClick={handleDetailedClick}
          style={{ 
            padding: '10px 20px',
            margin: '10px',
            cursor: 'pointer'
          }}
        >
          Click Me (Check Console)
        </button>
        
        <div 
          onMouseMove={handleDetailedClick}
          onMouseEnter={handleDetailedClick}
          onMouseLeave={handleDetailedClick}
          style={{
            width: '200px',
            height: '100px',
            border: '2px solid #007bff',
            margin: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8f9fa'
          }}
        >
          Mouse Area (Check Console)
        </div>
      </section>
      
      <section>
        <h3>Keyboard Events</h3>
        <input 
          type="text"
          placeholder="Type here to see keyboard events"
          onKeyDown={handleKeyboardEvent}
          onKeyUp={handleKeyboardEvent}
          onKeyPress={handleKeyboardEvent}
          style={{ padding: '10px', margin: '10px', width: '300px' }}
        />
      </section>
      
      <section>
        <h3>Form Events</h3>
        <form onChange={handleFormEvent}>
          <input 
            type="text" 
            name="username" 
            placeholder="Username"
            style={{ padding: '5px', margin: '5px' }}
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password"
            style={{ padding: '5px', margin: '5px' }}
          />
          <label style={{ margin: '5px' }}>
            <input type="checkbox" name="remember" />
            Remember me
          </label>
          <select name="country" style={{ padding: '5px', margin: '5px' }}>
            <option value="">Select Country</option>
            <option value="us">United States</option>
            <option value="ca">Canada</option>
            <option value="uk">United Kingdom</option>
          </select>
        </form>
      </section>
      
      {eventInfo && (
        <section>
          <h3>Last Event Info</h3>
          <pre style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '10px', 
            borderRadius: '4px',
            fontSize: '12px' 
          }}>
            {JSON.stringify(eventInfo, null, 2)}
          </pre>
        </section>
      )}
    </div>
  );
}
```

### Accessing Native Events

```jsx
function NativeEventAccess() {
  const handleNativeEvent = (event) => {
    // Access the native browser event
    const nativeEvent = event.nativeEvent;
    
    console.log('React SyntheticEvent:', event);
    console.log('Native Browser Event:', nativeEvent);
    
    // Example: Access native event properties not available in SyntheticEvent
    if (nativeEvent instanceof MouseEvent) {
      console.log('Native mouse event details:', {
        movementX: nativeEvent.movementX,
        movementY: nativeEvent.movementY,
        region: nativeEvent.region
      });
    }
  };
  
  const handleTouchEvent = (event) => {
    const nativeEvent = event.nativeEvent;
    
    if (nativeEvent instanceof TouchEvent) {
      console.log('Touch event:', {
        touches: nativeEvent.touches.length,
        changedTouches: nativeEvent.changedTouches.length,
        targetTouches: nativeEvent.targetTouches.length
      });
    }
  };
  
  return (
    <div>
      <button 
        onClick={handleNativeEvent}
        onTouchStart={handleTouchEvent}
        style={{ padding: '20px' }}
      >
        Test Native Event Access
      </button>
    </div>
  );
}
```

## Preventing Default Behavior

Many HTML elements have default behaviors (form submission, link navigation, etc.). React allows you to prevent these defaults.

### Common preventDefault Use Cases

```jsx
function PreventDefaultExamples() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  
  // Prevent form submission and handle it manually
  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent page refresh
    
    // Validate form
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      console.log('Form would be submitted:', formData);
      alert('Form submitted successfully!');
    }
  };
  
  // Prevent link navigation
  const handleLinkClick = (event) => {
    event.preventDefault();
    console.log('Link click intercepted');
    
    // Custom navigation logic
    const shouldNavigate = window.confirm('Do you want to navigate to this link?');
    if (shouldNavigate) {
      window.location.href = event.target.href;
    }
  };
  
  // Prevent context menu
  const handleContextMenu = (event) => {
    event.preventDefault();
    console.log('Right-click detected, but context menu prevented');
    alert('Context menu is disabled on this element');
  };
  
  // Prevent text selection
  const handleSelectStart = (event) => {
    event.preventDefault();
    console.log('Text selection prevented');
  };
  
  // Conditional preventDefault
  const handleKeyDown = (event) => {
    // Prevent certain keys
    if (event.key === 'Enter' && event.ctrlKey) {
      event.preventDefault();
      console.log('Ctrl+Enter prevented');
      return;
    }
    
    // Allow only numbers in number input
    if (event.target.type === 'number' && 
        !/[0-9]/.test(event.key) && 
        !['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault();
    }
  };
  
  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  
  return (
    <div className="prevent-default-examples">
      <h2>Preventing Default Behaviors</h2>
      
      <section>
        <h3>Custom Form Handling</h3>
        <form onSubmit={handleFormSubmit}>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => updateFormData('username', e.target.value)}
              style={{ 
                padding: '8px', 
                margin: '5px',
                border: errors.username ? '2px solid red' : '1px solid #ccc'
              }}
            />
            {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
          </div>
          
          <div>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
              style={{ 
                padding: '8px', 
                margin: '5px',
                border: errors.email ? '2px solid red' : '1px solid #ccc'
              }}
            />
            {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => updateFormData('password', e.target.value)}
              style={{ 
                padding: '8px', 
                margin: '5px',
                border: errors.password ? '2px solid red' : '1px solid #ccc'
              }}
            />
            {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
          </div>
          
          <button type="submit" style={{ padding: '10px 20px', margin: '10px' }}>
            Submit (Prevents Default)
          </button>
        </form>
      </section>
      
      <section>
        <h3>Custom Link Handling</h3>
        <a 
          href="https://example.com"
          onClick={handleLinkClick}
          style={{ color: '#007bff', textDecoration: 'underline' }}
        >
          Click me (asks for confirmation)
        </a>
      </section>
      
      <section>
        <h3>Disabled Context Menu</h3>
        <div 
          onContextMenu={handleContextMenu}
          style={{
            padding: '20px',
            border: '1px solid #ccc',
            backgroundColor: '#f8f9fa',
            userSelect: 'none'
          }}
        >
          Right-click me (context menu disabled)
        </div>
      </section>
      
      <section>
        <h3>Non-selectable Text</h3>
        <p 
          onSelectStart={handleSelectStart}
          style={{ 
            padding: '10px',
            backgroundColor: '#fff3cd',
            border: '1px solid #ffeaa7'
          }}
        >
          Try to select this text (selection prevented)
        </p>
      </section>
      
      <section>
        <h3>Restricted Key Input</h3>
        <input
          type="number"
          placeholder="Numbers only"
          onKeyDown={handleKeyDown}
          style={{ padding: '8px', margin: '5px' }}
        />
        <input
          type="text"
          placeholder="Try Ctrl+Enter"
          onKeyDown={handleKeyDown}
          style={{ padding: '8px', margin: '5px' }}
        />
      </section>
    </div>
  );
}
```

## Event Delegation

React uses event delegation internally - it attaches event listeners to the document root and manages them efficiently. Understanding this helps with performance and debugging.

### How Event Delegation Works in React

```jsx
function EventDelegationExample() {
  const [clickedItem, setClickedItem] = useState(null);
  const [items] = useState([
    { id: 1, name: 'Item 1', category: 'A' },
    { id: 2, name: 'Item 2', category: 'B' },
    { id: 3, name: 'Item 3', category: 'A' },
    { id: 4, name: 'Item 4', category: 'C' },
    { id: 5, name: 'Item 5', category: 'B' }
  ]);
  
  // ❌ Inefficient: Creating event handlers for each item
  const handleItemClickIndividual = (item) => {
    setClickedItem(item);
  };
  
  // ✅ Efficient: Single event handler using event delegation
  const handleListClick = (event) => {
    // Find the clicked item using event.target
    const itemElement = event.target.closest('[data-item-id]');
    if (itemElement) {
      const itemId = parseInt(itemElement.dataset.itemId);
      const item = items.find(item => item.id === itemId);
      setClickedItem(item);
    }
  };
  
  // Event delegation with action handling
  const handleListAction = (event) => {
    const action = event.target.dataset.action;
    const itemId = parseInt(event.target.closest('[data-item-id]')?.dataset.itemId);
    
    if (!itemId) return;
    
    const item = items.find(item => item.id === itemId);
    
    switch (action) {
      case 'view':
        console.log('Viewing item:', item);
        break;
      case 'edit':
        console.log('Editing item:', item);
        break;
      case 'delete':
        console.log('Deleting item:', item);
        break;
      default:
        console.log('Clicked item:', item);
    }
  };
  
  return (
    <div className="event-delegation-example">
      <h2>Event Delegation Examples</h2>
      
      <section>
        <h3>❌ Individual Event Handlers (Less Efficient)</h3>
        <div className="item-list">
          {items.map(item => (
            <div 
              key={item.id}
              onClick={() => handleItemClickIndividual(item)}
              style={{
                padding: '10px',
                margin: '5px',
                border: '1px solid #ccc',
                cursor: 'pointer',
                backgroundColor: clickedItem?.id === item.id ? '#e7f3ff' : '#fff'
              }}
            >
              {item.name} (Category: {item.category})
            </div>
          ))}
        </div>
      </section>
      
      <section>
        <h3>✅ Event Delegation (More Efficient)</h3>
        <div className="item-list" onClick={handleListClick}>
          {items.map(item => (
            <div 
              key={item.id}
              data-item-id={item.id}
              style={{
                padding: '10px',
                margin: '5px',
                border: '1px solid #ccc',
                cursor: 'pointer',
                backgroundColor: clickedItem?.id === item.id ? '#e7f3ff' : '#fff'
              }}
            >
              {item.name} (Category: {item.category})
            </div>
          ))}
        </div>
      </section>
      
      <section>
        <h3>✅ Event Delegation with Actions</h3>
        <div className="item-list" onClick={handleListAction}>
          {items.map(item => (
            <div 
              key={item.id}
              data-item-id={item.id}
              style={{
                padding: '10px',
                margin: '5px',
                border: '1px solid #ccc',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>{item.name} (Category: {item.category})</span>
              <div>
                <button 
                  data-action="view"
                  style={{ margin: '0 2px', padding: '4px 8px' }}
                >
                  View
                </button>
                <button 
                  data-action="edit"
                  style={{ margin: '0 2px', padding: '4px 8px' }}
                >
                  Edit
                </button>
                <button 
                  data-action="delete"
                  style={{ margin: '0 2px', padding: '4px 8px', color: 'red' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {clickedItem && (
        <div style={{ 
          marginTop: '20px', 
          padding: '10px', 
          backgroundColor: '#d4edda',
          border: '1px solid #c3e6cb',
          borderRadius: '4px'
        }}>
          Last clicked: {clickedItem.name}
        </div>
      )}
    </div>
  );
}
```

## Form Handling Basics

Forms are one of the most common places where event handling is crucial. React provides powerful patterns for handling form data and validation.

### Controlled Components

```jsx
function ControlledFormExample() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    gender: '',
    country: '',
    newsletter: false,
    interests: [],
    bio: '',
    website: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Generic field update handler
  const updateField = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
    
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: ''
      }));
    }
  };
  
  // Handle text inputs
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    
    if (type === 'checkbox') {
      updateField(name, checked);
    } else {
      updateField(name, value);
    }
  };
  
  // Handle multiple checkboxes (interests)
  const handleInterestChange = (event) => {
    const { value, checked } = event.target;
    const currentInterests = formData.interests;
    
    if (checked) {
      updateField('interests', [...currentInterests, value]);
    } else {
      updateField('interests', currentInterests.filter(interest => interest !== value));
    }
  };
  
  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
    }
    
    if (formData.age && (isNaN(formData.age) || formData.age < 1 || formData.age > 120)) {
      newErrors.age = 'Please enter a valid age (1-120)';
    }
    
    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = 'Website must start with http:// or https://';
    }
    
    if (formData.bio.length > 500) {
      newErrors.bio = 'Bio must be less than 500 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted:', formData);
      alert('Form submitted successfully!');
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        gender: '',
        country: '',
        newsletter: false,
        interests: [],
        bio: '',
        website: ''
      });
      
    } catch (error) {
      console.error('Submission error:', error);
      alert('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const interestOptions = [
    'Programming',
    'Design',
    'Marketing',
    'Data Science',
    'Gaming',
    'Music',
    'Sports',
    'Travel'
  ];
  
  return (
    <div className="controlled-form">
      <h2>Controlled Form Example</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Text Inputs */}
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={errors.firstName ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.firstName && <span className="error-text">{errors.firstName}</span>}
          </div>
          
          <div className="form-field">
            <label htmlFor="lastName">Last Name *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={errors.lastName ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.lastName && <span className="error-text">{errors.lastName}</span>}
          </div>
        </div>
        
        <div className="form-field">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? 'error' : ''}
            disabled={isSubmitting}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
        
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              min="1"
              max="120"
              className={errors.age ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.age && <span className="error-text">{errors.age}</span>}
          </div>
          
          <div className="form-field">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              disabled={isSubmitting}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
        </div>
        
        <div className="form-field">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            disabled={isSubmitting}
          >
            <option value="">Select Country</option>
            <option value="us">United States</option>
            <option value="ca">Canada</option>
            <option value="uk">United Kingdom</option>
            <option value="de">Germany</option>
            <option value="fr">France</option>
            <option value="jp">Japan</option>
            <option value="au">Australia</option>
          </select>
        </div>
        
        <div className="form-field">
          <label htmlFor="website">Website</label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            placeholder="https://example.com"
            className={errors.website ? 'error' : ''}
            disabled={isSubmitting}
          />
          {errors.website && <span className="error-text">{errors.website}</span>}
        </div>
        
        {/* Checkbox */}
        <div className="form-field">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
            Subscribe to newsletter
          </label>
        </div>
        
        {/* Multiple Checkboxes */}
        <div className="form-field">
          <label>Interests</label>
          <div className="checkbox-group">
            {interestOptions.map(interest => (
              <label key={interest} className="checkbox-label">
                <input
                  type="checkbox"
                  value={interest}
                  checked={formData.interests.includes(interest)}
                  onChange={handleInterestChange}
                  disabled={isSubmitting}
                />
                {interest}
              </label>
            ))}
          </div>
        </div>
        
        {/* Textarea */}
        <div className="form-field">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Tell us about yourself..."
            rows={4}
            maxLength={500}
            className={errors.bio ? 'error' : ''}
            disabled={isSubmitting}
          />
          <small>{formData.bio.length}/500 characters</small>
          {errors.bio && <span className="error-text">{errors.bio}</span>}
        </div>
        
        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="submit-button"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Form'}
        </button>
      </form>
      
      {/* Form Data Preview */}
      <div className="form-preview">
        <h3>Form Data Preview</h3>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
  );
}
```

### Uncontrolled Components with Refs

```jsx
import { useRef } from 'react';

function UncontrolledFormExample() {
  const formRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Get form data using FormData API
    const formData = new FormData(formRef.current);
    
    // Convert to regular object
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    
    console.log('Uncontrolled form data:', data);
    
    // Handle file upload
    const fileInput = fileInputRef.current;
    if (fileInput.files.length > 0) {
      console.log('Selected files:', Array.from(fileInput.files));
    }
  };
  
  const handleReset = () => {
    formRef.current.reset();
    fileInputRef.current.value = '';
  };
  
  return (
    <div className="uncontrolled-form">
      <h2>Uncontrolled Form Example</h2>
      
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="uncontrolled-name">Name</label>
          <input
            type="text"
            id="uncontrolled-name"
            name="name"
            defaultValue="John Doe"
          />
        </div>
        
        <div className="form-field">
          <label htmlFor="uncontrolled-email">Email</label>
          <input
            type="email"
            id="uncontrolled-email"
            name="email"
            required
          />
        </div>
        
        <div className="form-field">
          <label htmlFor="uncontrolled-message">Message</label>
          <textarea
            id="uncontrolled-message"
            name="message"
            rows={4}
            defaultValue="Default message"
          />
        </div>
        
        <div className="form-field">
          <label htmlFor="uncontrolled-file">Upload File</label>
          <input
            type="file"
            id="uncontrolled-file"
            name="file"
            ref={fileInputRef}
            multiple
            accept=".jpg,.jpeg,.png,.pdf"
          />
        </div>
        
        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
}
```

## Advanced Event Handling Patterns

### 1. Debouncing Events

```jsx
function DebouncingExample() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Debounce hook
  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
    
    return debouncedValue;
  };
  
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  // Perform search when debounced term changes
  useEffect(() => {
    if (debouncedSearchTerm) {
      performSearch(debouncedSearchTerm);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);
  
  const performSearch = async (term) => {
    setIsSearching(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Mock search results
      const mockResults = [
        `Result 1 for "${term}"`,
        `Result 2 for "${term}"`,
        `Result 3 for "${term}"`,
        `Result 4 for "${term}"`,
        `Result 5 for "${term}"`
      ];
      
      setSearchResults(mockResults);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  return (
    <div className="debouncing-example">
      <h2>Debounced Search</h2>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search (debounced 500ms)..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            padding: '10px',
            fontSize: '16px',
            width: '300px',
            border: '2px solid #ddd',
            borderRadius: '4px'
          }}
        />
        
        {isSearching && (
          <div style={{ margin: '10px 0', color: '#666' }}>
            Searching...
          </div>
        )}
      </div>
      
      <div className="search-results">
        {searchResults.length > 0 && (
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            marginTop: '10px'
          }}>
            {searchResults.map((result, index) => (
              <li 
                key={index}
                style={{
                  padding: '8px',
                  margin: '4px 0',
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #dee2e6',
                  borderRadius: '4px'
                }}
              >
                {result}
              </li>
            ))}
          </ul>
        )}
        
        {searchTerm && !isSearching && searchResults.length === 0 && (
          <div style={{ margin: '10px 0', color: '#666' }}>
            No results found for "{searchTerm}"
          </div>
        )}
      </div>
      
      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <p>Search term: "{searchTerm}"</p>
        <p>Debounced term: "{debouncedSearchTerm}"</p>
      </div>
    </div>
  );
}
```

### 2. Throttling Events

```jsx
function ThrottlingExample() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  // Throttle hook
  const useThrottle = (callback, delay) => {
    const lastRun = useRef(Date.now());
    
    return useCallback((...args) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = Date.now();
      }
    }, [callback, delay]);
  };
  
  // Throttled event handlers
  const throttledScrollHandler = useThrottle((event) => {
    setScrollPosition(window.pageYOffset);
  }, 100);
  
  const throttledMouseHandler = useThrottle((event) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY
    });
  }, 50);
  
  const throttledResizeHandler = useThrottle(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, 250);
  
  useEffect(() => {
    window.addEventListener('scroll', throttledScrollHandler);
    window.addEventListener('mousemove', throttledMouseHandler);
    window.addEventListener('resize', throttledResizeHandler);
    
    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
      window.removeEventListener('mousemove', throttledMouseHandler);
      window.removeEventListener('resize', throttledResizeHandler);
    };
  }, [throttledScrollHandler, throttledMouseHandler, throttledResizeHandler]);
  
  return (
    <div className="throttling-example">
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: '#fff',
          padding: '10px',
          borderBottom: '1px solid #ddd',
          zIndex: 1000
        }}
      >
        <h2>Throttled Events</h2>
        <div style={{ display: 'flex', gap: '20px', fontSize: '14px' }}>
          <div>Scroll: {scrollPosition}px</div>
          <div>Mouse: ({mousePosition.x}, {mousePosition.y})</div>
          <div>Window: {windowSize.width} × {windowSize.height}</div>
        </div>
      </div>
      
      <div style={{ marginTop: '100px', height: '200vh', padding: '20px' }}>
        <h3>Scroll down and move your mouse</h3>
        <p>The values above are throttled:</p>
        <ul>
          <li>Scroll position updates every 100ms</li>
          <li>Mouse position updates every 50ms</li>
          <li>Window size updates every 250ms</li>
        </ul>
        
        <div style={{ marginTop: '50px' }}>
          <h4>Why use throttling?</h4>
          <p>
            Throttling limits how often an event handler can be called, 
            which is useful for performance-intensive events like:
          </p>
          <ul>
            <li>Scroll events</li>
            <li>Mouse move events</li>
            <li>Window resize events</li>
            <li>Input events (alternative to debouncing)</li>
          </ul>
        </div>
        
        <div style={{ marginTop: '100px', height: '100px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p>Keep scrolling to see more content...</p>
        </div>
        
        <div style={{ marginTop: '100px' }}>
          <h4>Content continues...</h4>
          <p>This is additional content to demonstrate scrolling behavior.</p>
        </div>
      </div>
    </div>
  );
}
```

### 3. Event Composition and Higher-Order Event Handlers

```jsx
function EventCompositionExample() {
  const [logs, setLogs] = useState([]);
  
  // Add log entry
  const addLog = (message) => {
    setLogs(prev => [...prev, {
      id: Date.now(),
      message,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };
  
  // Higher-order function to compose event handlers
  const withLogging = (handler, logMessage) => {
    return (event) => {
      addLog(logMessage);
      if (handler) {
        handler(event);
      }
    };
  };
  
  // Higher-order function to add analytics
  const withAnalytics = (handler, analyticsData) => {
    return (event) => {
      console.log('Analytics:', analyticsData);
      if (handler) {
        handler(event);
      }
    };
  };
  
  // Higher-order function to add validation
  const withValidation = (handler, validator) => {
    return (event) => {
      if (validator(event)) {
        if (handler) {
          handler(event);
        }
      } else {
        addLog('Validation failed');
      }
    };
  };
  
  // Compose multiple event handlers
  const compose = (...handlers) => {
    return (event) => {
      handlers.forEach(handler => {
        if (handler) {
          handler(event);
        }
      });
    };
  };
  
  // Base event handlers
  const handleButtonClick = (event) => {
    addLog(`Button "${event.target.textContent}" clicked`);
  };
  
  const handleInputChange = (event) => {
    addLog(`Input changed: ${event.target.value}`);
  };
  
  // Validation functions
  const validateNotEmpty = (event) => {
    return event.target.value.trim().length > 0;
  };
  
  const validateMinLength = (minLength) => (event) => {
    return event.target.value.length >= minLength;
  };
  
  return (
    <div className="event-composition-example">
      <h2>Event Composition Example</h2>
      
      <div className="controls" style={{ marginBottom: '20px' }}>
        {/* Simple logged button */}
        <button onClick={withLogging(handleButtonClick, 'Simple button clicked')}>
          Simple Button
        </button>
        
        {/* Button with logging and analytics */}
        <button 
          onClick={compose(
            withLogging(handleButtonClick, 'Analytics button clicked'),
            withAnalytics(null, { button: 'analytics', section: 'demo' })
          )}
          style={{ margin: '0 10px' }}
        >
          Analytics Button
        </button>
        
        {/* Validated input */}
        <input
          type="text"
          placeholder="Type something (validated)"
          onChange={compose(
            withValidation(
              withLogging(handleInputChange, 'Valid input changed'),
              validateNotEmpty
            )
          )}
          style={{ margin: '0 10px', padding: '5px' }}
        />
        
        {/* Input with multiple validations */}
        <input
          type="text"
          placeholder="Min 5 characters"
          onChange={compose(
            withValidation(
              withLogging(handleInputChange, 'Long input changed'),
              validateMinLength(5)
            ),
            withAnalytics(null, { input: 'validated', minLength: 5 })
          )}
          style={{ margin: '0 10px', padding: '5px' }}
        />
      </div>
      
      {/* Event log */}
      <div className="event-log">
        <h3>Event Log</h3>
        <button 
          onClick={() => setLogs([])}
          style={{ marginBottom: '10px' }}
        >
          Clear Log
        </button>
        
        <div 
          style={{
            height: '200px',
            overflowY: 'auto',
            border: '1px solid #ddd',
            padding: '10px',
            backgroundColor: '#f8f9fa'
          }}
        >
          {logs.length === 0 ? (
            <p style={{ color: '#666' }}>No events logged yet</p>
          ) : (
            logs.map(log => (
              <div key={log.id} style={{ marginBottom: '5px' }}>
                <span style={{ color: '#666', fontSize: '12px' }}>
                  [{log.timestamp}]
                </span>
                {' '}
                <span>{log.message}</span>
              </div>
            ))
          )}
        </div>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Event Composition Benefits</h3>
        <ul>
          <li><strong>Reusability:</strong> Compose behavior from smaller functions</li>
          <li><strong>Separation of Concerns:</strong> Logging, analytics, validation are separate</li>
          <li><strong>Testability:</strong> Each piece can be tested independently</li>
          <li><strong>Flexibility:</strong> Mix and match behaviors as needed</li>
        </ul>
      </div>
    </div>
  );
}
```

## Custom Event Handling Patterns

### 1. Global Event Listener Hook

```jsx
function useGlobalEventListener(eventType, handler, options = {}) {
  const savedHandler = useRef(handler);
  
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  
  useEffect(() => {
    const eventListener = (event) => savedHandler.current(event);
    
    const target = options.target || window;
    target.addEventListener(eventType, eventListener, options);
    
    return () => {
      target.removeEventListener(eventType, eventListener, options);
    };
  }, [eventType, options.target, options.passive, options.capture]);
}

function GlobalEventExample() {
  const [keyPressed, setKeyPressed] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [online, setOnline] = useState(navigator.onLine);
  
  // Global keyboard listener
  useGlobalEventListener('keydown', (event) => {
    setKeyPressed(`${event.key} (${event.code})`);
    
    // Handle specific key combinations
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault();
      console.log('Ctrl+S intercepted!');
    }
  });
  
  // Global click counter
  useGlobalEventListener('click', () => {
    setClickCount(prev => prev + 1);
  });
  
  // Network status
  useGlobalEventListener('online', () => setOnline(true));
  useGlobalEventListener('offline', () => setOnline(false));
  
  // Clear key pressed after delay
  useEffect(() => {
    if (keyPressed) {
      const timer = setTimeout(() => setKeyPressed(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [keyPressed]);
  
  return (
    <div className="global-event-example">
      <h2>Global Event Listeners</h2>
      
      <div className="status-display">
        <div style={{ padding: '10px', margin: '10px 0', backgroundColor: '#f8f9fa' }}>
          <strong>Last Key Pressed:</strong> {keyPressed || 'None'}
        </div>
        
        <div style={{ padding: '10px', margin: '10px 0', backgroundColor: '#f8f9fa' }}>
          <strong>Total Clicks:</strong> {clickCount}
        </div>
        
        <div style={{ 
          padding: '10px', 
          margin: '10px 0', 
          backgroundColor: online ? '#d4edda' : '#f8d7da',
          color: online ? '#155724' : '#721c24'
        }}>
          <strong>Network Status:</strong> {online ? 'Online' : 'Offline'}
        </div>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <p>Try the following:</p>
        <ul>
          <li>Press any key to see it detected globally</li>
          <li>Press Ctrl+S to see prevention of default save</li>
          <li>Click anywhere to increment the counter</li>
          <li>Disconnect/reconnect your internet to see network status</li>
        </ul>
      </div>
    </div>
  );
}
```

### 2. Event Emitter Pattern

```jsx
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
    
    // Return unsubscribe function
    return () => {
      this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
    };
  }
  
  emit(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(callback => callback(data));
    }
  }
  
  off(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
    }
  }
  
  once(eventName, callback) {
    const onceCallback = (data) => {
      callback(data);
      this.off(eventName, onceCallback);
    };
    this.on(eventName, onceCallback);
  }
}

// Global event emitter instance
const globalEventEmitter = new EventEmitter();

function EventEmitterExample() {
  const [notifications, setNotifications] = useState([]);
  const [userActions, setUserActions] = useState([]);
  
  useEffect(() => {
    // Subscribe to custom events
    const unsubscribeNotification = globalEventEmitter.on('notification', (data) => {
      setNotifications(prev => [...prev, {
        id: Date.now(),
        ...data,
        timestamp: new Date().toLocaleTimeString()
      }]);
    });
    
    const unsubscribeUserAction = globalEventEmitter.on('userAction', (data) => {
      setUserActions(prev => [...prev, {
        id: Date.now(),
        ...data,
        timestamp: new Date().toLocaleTimeString()
      }]);
    });
    
    // Cleanup subscriptions
    return () => {
      unsubscribeNotification();
      unsubscribeUserAction();
    };
  }, []);
  
  const sendNotification = (type, message) => {
    globalEventEmitter.emit('notification', { type, message });
  };
  
  const logUserAction = (action, details) => {
    globalEventEmitter.emit('userAction', { action, details });
  };
  
  const clearNotifications = () => {
    setNotifications([]);
  };
  
  const clearUserActions = () => {
    setUserActions([]);
  };
  
  return (
    <div className="event-emitter-example">
      <h2>Event Emitter Pattern</h2>
      
      <div className="controls" style={{ marginBottom: '20px' }}>
        <h3>Trigger Events</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button onClick={() => sendNotification('success', 'Operation completed successfully!')}>
            Success Notification
          </button>
          <button onClick={() => sendNotification('error', 'Something went wrong!')}>
            Error Notification
          </button>
          <button onClick={() => sendNotification('info', 'Here is some information')}>
            Info Notification
          </button>
          <button onClick={() => logUserAction('login', 'User logged in from dashboard')}>
            Log Login Action
          </button>
          <button onClick={() => logUserAction('purchase', 'User purchased premium plan')}>
            Log Purchase Action
          </button>
          <button onClick={() => logUserAction('logout', 'User logged out')}>
            Log Logout Action
          </button>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Notifications */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Notifications ({notifications.length})</h3>
            <button onClick={clearNotifications}>Clear</button>
          </div>
          <div 
            style={{
              height: '200px',
              overflowY: 'auto',
              border: '1px solid #ddd',
              padding: '10px',
              backgroundColor: '#f8f9fa'
            }}
          >
            {notifications.length === 0 ? (
              <p style={{ color: '#666' }}>No notifications</p>
            ) : (
              notifications.map(notification => (
                <div 
                  key={notification.id}
                  style={{
                    padding: '8px',
                    margin: '5px 0',
                    borderRadius: '4px',
                    backgroundColor: 
                      notification.type === 'success' ? '#d4edda' :
                      notification.type === 'error' ? '#f8d7da' :
                      '#d1ecf1',
                    borderLeft: `4px solid ${
                      notification.type === 'success' ? '#28a745' :
                      notification.type === 'error' ? '#dc3545' :
                      '#17a2b8'
                    }`
                  }}
                >
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    [{notification.timestamp}]
                  </div>
                  <div><strong>{notification.type.toUpperCase()}:</strong> {notification.message}</div>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* User Actions */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>User Actions ({userActions.length})</h3>
            <button onClick={clearUserActions}>Clear</button>
          </div>
          <div 
            style={{
              height: '200px',
              overflowY: 'auto',
              border: '1px solid #ddd',
              padding: '10px',
              backgroundColor: '#f8f9fa'
            }}
          >
            {userActions.length === 0 ? (
              <p style={{ color: '#666' }}>No user actions</p>
            ) : (
              userActions.map(action => (
                <div 
                  key={action.id}
                  style={{
                    padding: '8px',
                    margin: '5px 0',
                    borderRadius: '4px',
                    backgroundColor: '#fff3cd',
                    borderLeft: '4px solid #ffc107'
                  }}
                >
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    [{action.timestamp}]
                  </div>
                  <div><strong>{action.action}:</strong> {action.details}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Event Emitter Benefits</h3>
        <ul>
          <li><strong>Decoupling:</strong> Components don't need direct references to each other</li>
          <li><strong>Scalability:</strong> Easy to add new event listeners</li>
          <li><strong>Flexibility:</strong> Events can have multiple listeners</li>
          <li><strong>Clean Architecture:</strong> Clear separation of concerns</li>
        </ul>
      </div>
    </div>
  );
}
```

## Real-World Event Handling Examples

### 1. Interactive Drawing Canvas

```jsx
function DrawingCanvas() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState('pen');
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState('#000000');
  const [canvasHistory, setCanvasHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    // Set initial canvas properties
    context.lineCap = 'round';
    context.lineJoin = 'round';
    
    // Save initial state
    saveCanvasState();
  }, []);
  
  const saveCanvasState = () => {
    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL();
    
    setCanvasHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(imageData);
      return newHistory;
    });
    
    setHistoryIndex(prev => prev + 1);
  };
  
  const getMousePos = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  };
  
  const startDrawing = (event) => {
    if (currentTool === 'pan') return;
    
    setIsDrawing(true);
    const pos = getMousePos(event);
    const context = canvasRef.current.getContext('2d');
    
    context.beginPath();
    context.moveTo(pos.x, pos.y);
    
    if (currentTool === 'eraser') {
      context.globalCompositeOperation = 'destination-out';
    } else {
      context.globalCompositeOperation = 'source-over';
      context.strokeStyle = brushColor;
    }
    
    context.lineWidth = brushSize;
  };
  
  const draw = (event) => {
    if (!isDrawing || currentTool === 'pan') return;
    
    const pos = getMousePos(event);
    const context = canvasRef.current.getContext('2d');
    
    context.lineTo(pos.x, pos.y);
    context.stroke();
  };
  
  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveCanvasState();
    }
  };
  
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    saveCanvasState();
  };
  
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      restoreCanvasState(canvasHistory[historyIndex - 1]);
    }
  };
  
  const redo = () => {
    if (historyIndex < canvasHistory.length - 1) {
      setHistoryIndex(prev => prev + 1);
      restoreCanvasState(canvasHistory[historyIndex + 1]);
    }
  };
  
  const restoreCanvasState = (imageData) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0);
    };
    
    img.src = imageData;
  };
  
  // Keyboard shortcuts
  useGlobalEventListener('keydown', (event) => {
    if (event.ctrlKey || event.metaKey) {
      switch (event.key) {
        case 'z':
          event.preventDefault();
          if (event.shiftKey) {
            redo();
          } else {
            undo();
          }
          break;
        case 'y':
          event.preventDefault();
          redo();
          break;
      }
    }
  });
  
  return (
    <div className="drawing-canvas">
      <h2>Interactive Drawing Canvas</h2>
      
      {/* Toolbar */}
      <div className="toolbar" style={{ 
        display: 'flex', 
        gap: '10px', 
        alignItems: 'center', 
        marginBottom: '10px',
        padding: '10px',
        backgroundColor: '#f8f9fa',
        borderRadius: '4px'
      }}>
        <div>
          <label>Tool: </label>
          <select 
            value={currentTool} 
            onChange={(e) => setCurrentTool(e.target.value)}
          >
            <option value="pen">Pen</option>
            <option value="eraser">Eraser</option>
          </select>
        </div>
        
        <div>
          <label>Size: </label>
          <input
            type="range"
            min="1"
            max="50"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
          />
          <span>{brushSize}px</span>
        </div>
        
        <div>
          <label>Color: </label>
          <input
            type="color"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
            disabled={currentTool === 'eraser'}
          />
        </div>
        
        <button onClick={undo} disabled={historyIndex <= 0}>
          Undo (Ctrl+Z)
        </button>
        
        <button onClick={redo} disabled={historyIndex >= canvasHistory.length - 1}>
          Redo (Ctrl+Y)
        </button>
        
        <button onClick={clearCanvas}>
          Clear
        </button>
      </div>
      
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{
          border: '2px solid #ddd',
          borderRadius: '4px',
          cursor: currentTool === 'pen' ? 'crosshair' : 
                 currentTool === 'eraser' ? 'grab' : 'default'
        }}
      />
      
      <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
        <p>Use mouse to draw. Keyboard shortcuts: Ctrl+Z (undo), Ctrl+Y (redo)</p>
      </div>
    </div>
  );
}
```

### 2. Drag and Drop File Upload

```jsx
function DragDropFileUpload() {
  const [files, setFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);
  
  const handleDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(true);
  };
  
  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    // Only set drag over to false if leaving the drop zone entirely
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsDragOver(false);
    }
  };
  
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(event.dataTransfer.files);
    addFiles(droppedFiles);
  };
  
  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    addFiles(selectedFiles);
    
    // Reset input value to allow selecting the same file again
    event.target.value = '';
  };
  
  const addFiles = (newFiles) => {
    const validFiles = newFiles.filter(file => {
      // Validate file type (images only for this example)
      return file.type.startsWith('image/') || file.type === 'application/pdf';
    });
    
    const filesWithMetadata = validFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending' // 'pending', 'uploading', 'completed', 'error'
    }));
    
    setFiles(prev => [...prev, ...filesWithMetadata]);
  };
  
  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileId];
      return newProgress;
    });
  };
  
  const uploadFile = async (fileData) => {
    setFiles(prev => prev.map(f => 
      f.id === fileData.id ? { ...f, status: 'uploading' } : f
    ));
    
    // Simulate file upload with progress
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          
          setUploadProgress(prev => ({ ...prev, [fileData.id]: 100 }));
          setFiles(prev => prev.map(f => 
            f.id === fileData.id ? { ...f, status: 'completed' } : f
          ));
          
          resolve();
        } else {
          setUploadProgress(prev => ({ ...prev, [fileData.id]: progress }));
        }
      }, 200);
    });
  };
  
  const uploadAll = async () => {
    const pendingFiles = files.filter(f => f.status === 'pending');
    
    for (const file of pendingFiles) {
      await uploadFile(file);
    }
  };
  
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  return (
    <div className="drag-drop-upload">
      <h2>Drag & Drop File Upload</h2>
      
      {/* Drop Zone */}
      <div
        className={`drop-zone ${isDragOver ? 'drag-over' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          width: '100%',
          height: '200px',
          border: `2px dashed ${isDragOver ? '#007bff' : '#ddd'}`,
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          backgroundColor: isDragOver ? '#f8f9ff' : '#fafafa',
          transition: 'all 0.3s ease'
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>📁</div>
          <p style={{ margin: '0 0 10px 0', fontSize: '18px' }}>
            {isDragOver ? 'Drop files here' : 'Drag & drop files here'}
          </p>
          <p style={{ margin: 0, color: '#666' }}>
            or click to select files
          </p>
          <p style={{ margin: '10px 0 0 0', fontSize: '12px', color: '#999' }}>
            Supports: Images (JPG, PNG, GIF) and PDF files
          </p>
        </div>
      </div>
      
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,.pdf"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
      
      {/* File List */}
      {files.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '10px'
          }}>
            <h3>Files ({files.length})</h3>
            <div>
              <button 
                onClick={uploadAll}
                disabled={!files.some(f => f.status === 'pending')}
                style={{ marginRight: '10px' }}
              >
                Upload All
              </button>
              <button onClick={() => setFiles([])}>
                Clear All
              </button>
            </div>
          </div>
          
          <div className="file-list">
            {files.map(fileData => (
              <div 
                key={fileData.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px',
                  margin: '5px 0',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: '#fff'
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold' }}>{fileData.name}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {formatFileSize(fileData.size)} • {fileData.type}
                  </div>
                  
                  {/* Progress Bar */}
                  {fileData.status === 'uploading' && (
                    <div style={{ marginTop: '5px' }}>
                      <div style={{
                        width: '100%',
                        height: '4px',
                        backgroundColor: '#e0e0e0',
                        borderRadius: '2px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${uploadProgress[fileData.id] || 0}%`,
                          height: '100%',
                          backgroundColor: '#007bff',
                          transition: 'width 0.3s ease'
                        }} />
                      </div>
                      <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                        {Math.round(uploadProgress[fileData.id] || 0)}%
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Status Badge */}
                <div style={{ marginLeft: '10px' }}>
                  {fileData.status === 'pending' && (
                    <span style={{ 
                      padding: '4px 8px', 
                      backgroundColor: '#ffc107', 
                      color: '#000',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      Pending
                    </span>
                  )}
                  {fileData.status === 'uploading' && (
                    <span style={{ 
                      padding: '4px 8px', 
                      backgroundColor: '#007bff', 
                      color: '#fff',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      Uploading...
                    </span>
                  )}
                  {fileData.status === 'completed' && (
                    <span style={{ 
                      padding: '4px 8px', 
                      backgroundColor: '#28a745', 
                      color: '#fff',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      ✓ Completed
                    </span>
                  )}
                </div>
                
                {/* Actions */}
                <div style={{ marginLeft: '10px' }}>
                  {fileData.status === 'pending' && (
                    <button onClick={() => uploadFile(fileData)}>
                      Upload
                    </button>
                  )}
                  <button 
                    onClick={() => removeFile(fileData.id)}
                    style={{ marginLeft: '5px', color: 'red' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

## Summary

Event handling is essential for creating interactive React applications:

- ✅ **SyntheticEvents** provide consistent cross-browser behavior
- ✅ **Event handlers** respond to user interactions and system events
- ✅ **preventDefault()** controls default browser behaviors
- ✅ **Event delegation** improves performance for dynamic content
- ✅ **Form handling** manages user input and validation
- ✅ **Advanced patterns** like debouncing and throttling optimize performance
- ✅ **Custom patterns** like event emitters enable complex interactions

## Practice Exercises

### Exercise 1: Interactive Form
Build a multi-step form with:
- Real-time validation
- Keyboard navigation
- Custom event handling
- Progress indication

### Exercise 2: Game Interface
Create a simple game with:
- Keyboard controls
- Mouse interactions
- Score tracking
- Event composition

### Exercise 3: Dashboard with Real-time Events
Build a dashboard that handles:
- WebSocket events
- User interactions
- Global keyboard shortcuts
- Event logging

## Additional Resources

### Documentation:
- [React Events](https://react.dev/learn/responding-to-events)
- [SyntheticEvent](https://react.dev/reference/react-dom/components/common#react-event-object)

### Performance:
- [Event Delegation](https://javascript.info/event-delegation)
- [Debouncing and Throttling](https://css-tricks.com/debouncing-throttling-explained-examples/)

### Advanced Topics:
- [Custom Events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events)
- [Event Composition](https://reactpatterns.com/#event-handler-composition)

---

*Next: Continue to Week 2 content covering Lists, Forms & Component Lifecycle for more advanced React concepts.*