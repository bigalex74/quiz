import React, {Component} from 'react';
import './App.css';
import Layout from "./Layout/Layout";
import Test from "./Containers/Test";
import HelpPage from './Containers/HelpPage';
import ResultPage from './Containers/ResultPage';

export default class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            currentPage: "Test"
        };
        this.resultData = null
    }
    onHelpClick () {
        this.setState({
            currentPage: "Help"
        })
    }
    onTestClick () {
        this.setState({
            currentPage: "Test"
        })
    }
    onResultClick (state) {
        this.resultData = state;
        this.setState({
            currentPage: "Result"
        })
    }

    render () {
        let Page = "Test";
        // Данный подход заставляет заново рендерить страницу с тестами, если пользователь
        // Нажал на кнопку "Возврат к тестированию", но очень не хотелось уже перегружать
        // файл Test. Да и в дальнейшем, если переписать данный кусок кода на React-Router
        // эта проблема исчезнет сама собой.
        switch (this.state.currentPage) {
            case "Test": Page = (<Test
                                    onHelpClick = {this.onHelpClick.bind(this)}
                                    onResultClick = {this.onResultClick.bind(this)}>
                                </Test>);
                                break;
            case "Help": Page = <HelpPage
                                    onTestClick = {this.onTestClick.bind(this)}>
                                </HelpPage>;
                                break;
            case "Result": Page = <ResultPage
                                    res = { this.resultData }>
                                  </ResultPage>;
                                  break;
            default: Page = null
        }
        return (
            <Layout>
                {Page}
            </Layout>
        );

    }
}

