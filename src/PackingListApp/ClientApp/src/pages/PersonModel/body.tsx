import * as React from 'react'
import { NewPersonItem, NewPersonItemStore } from 'src/stores/personStore';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { Form, Spin, Select, Input, Checkbox, Modal, Row, Col, Alert, InputNumber, Table } from 'antd';
let FormItem = Form.Item;
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'redux-scaffolding-ts'
import { nameof } from 'src/utils/object';
import autobind from 'autobind-decorator';
import { formatMessage } from 'src/services/http-service';

interface NewPersonItemViewProps {
    onClose: (id: string | undefined, item?: NewPersonItem) => void;
}

interface NewPersonItemViewState { }

interface ClassFormBodyProps {
    item: NewPersonItem | undefined,
    onSave?: () => Promise<any>;
    setFieldsValue(obj: Object): void;
    getFieldValue(fieldName: string): any;
    getFieldDecorator<T extends Object = {}>(id: keyof T, options?: GetFieldDecoratorOptions): (node: React.ReactNode) => React.ReactNode;
}

export class PersonItemFormBody extends React.Component<ClassFormBodyProps> {

    render() {
        const { getFieldDecorator } = this.props;
        var item = this.props.item || {} as NewPersonItem;

        return (
            <Form id="modaForm" onSubmit={() => { if (this.props.onSave) { this.props.onSave(); } }}>
                <Row gutter={24}>
                    <Col span={8}>
                        <FormItem label={"Name"}>
                            {getFieldDecorator(nameof<NewPersonItem>('name'),
                                { initialValue: item.name, })(<Input />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label={'Last Name'}>
                            {getFieldDecorator(nameof<NewPersonItem>('lastName'),
                                { initialValue: item.lastName, })(<Input />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label={'Occupation'}>
                            {getFieldDecorator(nameof<NewPersonItem>('occupation'),
                                { initialValue: item.occupation, })(<Input />)}
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        );
    }
}

@connect(["newPersonItem", NewPersonItemStore])
class NewPersonItemView extends React.Component<NewPersonItemViewProps & FormComponentProps, NewPersonItemViewState> {

    private get PersonItemsStore() {
        return (this.props as any).newPersonItem as NewPersonItemStore;
    }

    constructor(props: NewPersonItemViewProps & FormComponentProps) {
        super(props);
        this.PersonItemsStore.createNew({} as any);
    }

    componentWillReceiveProps(nextProps: NewPersonItemViewProps) {
        if (this.PersonItemsStore.state.result && this.PersonItemsStore.state.result.isSuccess)
            nextProps.onClose((this.PersonItemsStore.state.result as any).aggregateRootId, this.PersonItemsStore.state.item)
    }

    @autobind
    private onCreateNewItem() {
        var self = this;
        return new Promise((resolve, reject) => {
            self.props.form.validateFields(event => {
                var values = self.props.form.getFieldsValue();
                if (!event) {
                    values = { ...values, };
                    self.PersonItemsStore.change(values);
                    self.PersonItemsStore.submit().then(result => {
                        if (result.isSuccess) {
                            resolve();
                        } else {
                            reject();
                        }
                    });
                }
            });
        })
    }

    @autobind
    private onCancelNewItem() {
        this.PersonItemsStore.clear();
        this.props.onClose(undefined);
    }

    public render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Modal
                maskClosable={false}
                visible
                onCancel={this.onCancelNewItem}
                onOk={this.onCreateNewItem}
                closable={false}
                width='800px'
                title={"New PersonItem"}>
                {this.PersonItemsStore.state.result && !this.PersonItemsStore.state.result.isSuccess &&
                    <Alert type='error'
                        message="Ha ocurrido un error"
                        description={formatMessage(this.PersonItemsStore.state.result)}
                    />
                }
                <Spin spinning={this.PersonItemsStore.state.isBusy}>
                    <PersonItemFormBody
                        item={this.PersonItemsStore.state.item}
                        getFieldDecorator={getFieldDecorator}
                        getFieldValue={this.props.form.getFieldValue}
                        setFieldsValue={this.props.form.setFieldsValue}
                        onSave={this.onCreateNewItem}
                    />
                </Spin>
            </Modal>
        );
    }
}

export default Form.create({})(NewPersonItemView as any) as any as React.ComponentClass<NewPersonItemViewProps>;