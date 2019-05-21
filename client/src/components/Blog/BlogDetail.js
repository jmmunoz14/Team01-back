import React, { Component } from "react";
import { Link } from "react-router-dom";
import Chat from "../Chat/Chat";
import axios from "axios";
import { FormattedMessage } from 'react-intl';

export class BlogDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blog: {},
      chatLoad: false
    };
  }

  toMarkDown = () => {
    var markdown = require("markdown").markdown;
    var comentarioM = markdown.toHTML(this.state.blog.descripcion);
    return comentarioM;
  };

  componentDidMount() {
    axios
      .get("https://team01back.herokuapp.com/blogs/" + this.props.match.params.id)
      .then(res => {
        this.setState({ blog: res.data });
        this.setState({ chatLoad: true });
      });
  }
  render() {
    const { blog, chatLoad } = this.state;
    return (
      <div>
        <Link className="btn btn-info blog btn-lg btn-block" to="/blogs">
          <FormattedMessage
            id="Blog.volver"
            defaultMessage="Volver a Blogs"
          />
        </Link>
        <h1 className="blog">{blog.titulo}</h1>

        <div className="col-lg-8 col-md-10 mx-auto">
          {chatLoad && <div dangerouslySetInnerHTML={{ __html: this.toMarkDown() }} />}
        </div>
        {chatLoad && <Chat idChat={blog.idChat} />}
      </div>
    );
  }
}

export default BlogDetail;
