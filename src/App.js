import React from 'react';
import './App.css';
import Menu from './Menu';
import List from './List';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      films:[
        {id:0, rating: 4, title: 'Harry Potter y la cámara secreta', image: 'harry.jpeg'},
        {id:1, rating: 3, title: 'El Resplandor', image: 'resplandor.jpg'},
        {id:2, rating: 5, title: 'Los juegos del hambre', image: 'hambre.jpg'},
        {id:3, rating: 5, title: 'No respires', image: 'respires.jpeg'},
        {id:4, rating: 5, title: 'Zootropolis', image: 'zootropolis.jpg'},
        {id:5, rating: 4, title: 'Shreck', image: 'shreck.jpg'},
        {id:6, rating: 2, title: 'El Joker', image: 'joker.jpg'},
        {id:7, rating: 1, title: 'Nosotros', image: 'nosotros.jpg'}
      ],
      copyfilms: []
    };

    this.onSearch = this.onSearch.bind(this);
    this.addItem = this.addItem.bind(this);
    this.remove = this.remove.bind(this);
    this.updateRating = this.updateRating.bind(this);
  }

  initfilms(){
    //this.setState({copyfilms: [...this.state.films]});
    this.setState((state,props) => ({
      copyfilms: [...state.films]
    }));
  }

  componentDidMount(){
    this.initfilms();
  }

  onSearch(query){
    if(query === ''){
      this.setState({copyfilms: [...this.state.films]});
    }else{

      const temp = [...this.state.films];
      var res = [];
      temp.forEach(item =>{
        if(item.title.toLowerCase().indexOf(query) > -1){
          res.push(item);
        }
      });
    
      this.setState({copyfilms: [...res]});
    }
  }

  addItem(item){
    var temp = [...this.state.films];
    const id = temp[temp.length-1].id + 1;
    item['id'] = id;
    temp.push(item);
    this.setState({films: [...temp]});
    this.initfilms();
  }

  remove(id){
    var temp = [...this.state.films];
    const res = temp.filter(item => item.id != id);
    this.setState({films: [...res]});
    this.initfilms();
  }

  updateRating(item){
    var temp = [...this.state.films];
    const index = temp.findIndex(x => x.id === item.id);
    temp[index].title = item.title;
    temp[index].image = item.image;
    temp[index].rating = item.rating;

    this.setState({films: [...temp]});
    this.initfilms();
  }

  render(){
    return (
      <div className="app">
        <Menu title="Cartelera" onsearch={this.onSearch} onadd={this.addItem} />
        <List className="list" items={this.state.copyfilms} onremove={this.remove} onupdaterating={this.updateRating} />
      </div>
    );
  }
}

export default App;
