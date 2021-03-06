// @flow
import React from 'react';
import Responsive from 'components/common/Responsive';
import MarkdownRender from 'components/common/MarkdownRender';
import './PostContent.scss';

type Props = {
  body: string,
  theme: string,
  thumbnail: ?string,
  onSetToc: (toc: any) => void,
  onActivateHeading: (headingId: string) => void,
};

const PostContent = ({ body, onSetToc, onActivateHeading, thumbnail, theme }: Props) => (
  <div className="PostContent">
    {thumbnail && (
      <div className="post-thumbnail">
        <img src={thumbnail} alt="" />
      </div>
    )}
    <div className="contents">
      <MarkdownRender
        body={body}
        onSetToc={onSetToc}
        onActivateHeading={onActivateHeading}
        theme={theme || 'github'}
      />
    </div>
  </div>
);

export default PostContent;
