import { useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [searchImage, setSearchImage] = useState('');

  const handleImageChange = event => {
    setSearchImage(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchImage.trim() === '') {
      return;
    }
    onSubmit(searchImage);
    setSearchImage('');
  };

  return (
    <Header className="searchbar">
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <BiSearchAlt />
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchImage}
          onChange={handleImageChange}
        />
      </SearchForm>
    </Header>
  );
}

// export default class Searchbar extends Component {
//   state = {
//     searchImage: '',
//   };

//   handleImageChange = event => {
//     this.setState({ searchImage: event.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     if (this.state.searchImage.trim() === '') {
//       return;
//     }
//     this.props.onSubmit(this.state.searchImage);
//     this.setState({ searchImage: '' });
//   };

//   render() {
//     return (
//       <Header className="searchbar">
//         <SearchForm onSubmit={this.handleSubmit}>
//           <SearchFormButton type="submit">
//             <BiSearchAlt />
//           </SearchFormButton>

//           <SearchFormInput
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={this.state.searchImage}
//             onChange={this.handleImageChange}
//           />
//         </SearchForm>
//       </Header>
//     );
//   }
// }
