'use strict';

const e = React.createElement;

class PlusButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = { liked: false, count: 0 };
  }

  // Define a handleClick method
  handleClick(count) {
    this.setState({count: this.state.count +1});
  }

  render() {
    if (this.state.liked) {
      return 'You liked comment number ' + this.props.commentID;
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}

// Find all DOM containers, and render Like buttons into them.
document.querySelectorAll('.like_button_container')
  .forEach(domContainer => {
    // Read the comment ID from a data-* attribute.
    const commentID = parseInt(domContainer.dataset.commentid, 10);
    ReactDOM.render(
      e(PlusButton, { commentID: commentID }),
      domContainer
    );
  });