import { Pen } from '../../../../svgs';

import './account-profile-pic.scss';

interface AccountProfilePicProps {
  profilePicture: any;
  backgroudImage: any;
}

export function ProfilePic(props: AccountProfilePicProps)  : JSX.Element  {
  return (
    <div className="profile-image-grid ">
      <img className="profile-background" src={props.backgroudImage} alt="TQ" />

      <div className="profile-cell">
        <img className="profile-picture" src={props.profilePicture} alt="TQ" />
      </div>

      <div className="profile-cell">
        <button className="edit-button">
          <Pen></Pen>
        </button>
      </div>
    </div>
  );
}
