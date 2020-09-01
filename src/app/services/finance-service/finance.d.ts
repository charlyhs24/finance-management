interface IReqFinance {
    title: string;
    amount: number;
    debit_amout: number;
    credit_amount: number;
    description: string;
    finance_account_id: number;
    finance_account_type_id: number;
}
interface IFinance {
    id: number;
    title: string;
    debit_amout: number;
    credit_amount: number;
    description: string;
    finance_account_type: string;
    finance_account_name: string;
    finance_account_id: number;
    last_modified: string;
    created_at: string;
    deleted_at: string;
}
interface IRequestParamsFinance {
    sort_field: string;
    sort_type: string;
}