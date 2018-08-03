import React, { Component } from 'react';
import lottery from './lottery';
import {Message,Image,Container,Card,Icon,Statistic,Button,Label,Header} from 'semantic-ui-react';
import web3 from "./web3";
class App extends Component {
constructor(){
    super();
    this.state={
        playerscount:0,
        balance:0,
        address:0,
        showbutton:'none',
        loading:false
    }
}
   async componentDidMount(){
    let playerscount = await lottery.methods.getPlayersCounts().call();
    let balance = await lottery.methods.getBalance().call();
    let address = await lottery.methods.getManager().call();
    this.setState({playerscount:playerscount, balance:web3.utils.fromWei(balance,'ether'),address})
       let counts = await web3.eth.getAccounts();
        if(counts[0]===address){
            this.setState({showbutton:'inline'})
        }else{
            this.setState({showbutton:'none'})
        }
   }
    enter=async()=>{
        let counts = await web3.eth.getAccounts();
        this.setState({loading:true})
        await lottery.methods.enter().send({
            from:counts[0],
            value:'1000000000000000000'
        });
        this.setState({loading:false})
        window.location.reload(true)
    }
    checkwinner=async()=>{
                let counts = await web3.eth.getAccounts();
                await lottery.methods.pickWinner().send({
                    from:counts[0],
        });
        window.location.reload(true)
    }
    unfund=async()=>{
        let counts = await web3.eth.getAccounts();
        await lottery.methods.refund().send({
            from:counts[0],
        });
        window.location.reload(true)
        console.log()
    }
    render() {
        return (
            <div className="App">
                <Container text>
                    <br/>
                    <Message
                        error
                        header='来啊!大爷快活啊!区块链博彩,发家致富,单车变摩托...'
                        list={[
                            '全世界震惊了,还可以这样赚钱',
                            '一个以太币你买不了吃亏买不了上当!',
                        ]}
                    />
                    <Card.Group>
                        <Card>
                            <Image
                                src='/images/logo.jpg'
                                as='a'
                                size='medium'
                                href='http://google.com'
                                target='_blank'
                            />
                            <Card.Content>
                                <Card.Content extra>
                                    <div className='ui two buttons'>
                                        <Button basic color='orange'>
                                            <Header as='h2' color='orange'>管理员的地址:</Header>
                                        </Button>
                                    </div>
                                </Card.Content>
                                <Label color='brown' size='mini'>
                                    {this.state.address}
                                </Label>
                                <Card.Meta>每周三晚上8点准时开奖.</Card.Meta>
                                <Card.Description>
                                    <div>
                                        <Button as='div' labelPosition='right'>
                                            <Button icon>
                                                <Icon name='heart' />
                                                投注人数
                                            </Button>
                                            <Label as='a' basic pointing='left'>
                                                {this.state.playerscount}
                                            </Label>
                                        </Button>
                                    </div>
                                </Card.Description>
                                <Card.Description>
                                    <Statistic color='yellow'>
                                        <Statistic.Value>{this.state.balance}ether</Statistic.Value>
                                    </Statistic>
                                </Card.Description>
                            </Card.Content>
                            <Button animated onClick={this.enter} loading={this.state.loading} disabled={this.state.loading}>
                                <Button.Content visible>投注发家致富</Button.Content>
                                <Button.Content hidden>
                                    购买人生赢家
                                </Button.Content>
                            </Button>
                            <Button inverted color='red'  onClick={this.checkwinner} style={{display:this.state.showbutton}}>
                                开奖
                            </Button>
                            <Button inverted color='red' onClick={this.unfund} style={{display:this.state.showbutton}}>
                                退款
                            </Button>
                        </Card>
                    </Card.Group>
                </Container>
            </div>

        );
    }
}

export default App;