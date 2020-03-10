function eval() {
    // Do not use eval!!!
    return;
}


function expressionCalculator(expr) {
    
   let Out=[];
   let counter_out=0;
   let Stack=[];
   let k=0;
   let temp=[];
   let oper2,oper1;
   let counter=0;
   let rezult;
   let counter_of_left=0;
   let counter_of_right=0;
   for(let i=0;i<expr.length;i++)
   {
       if(expr[i]=='(') counter_of_left++;
       if(expr[i]==')') counter_of_right++;
   }
   if(counter_of_left!=counter_of_right) throw new Error("ExpressionError: Brackets must be paired");


   here: for(let i=0;i<expr.length;i++)
    {   
        if(expr[i]==" ") continue here;
        if(expr[i]=='(' || expr[i]==')' || expr[i]=='+' || expr[i]=='-' || expr[i]=='*' || expr[i]=='/')
        {
            if(i!=0)
            {
            if(temp[counter]===undefined)
            {
                temp[counter]=expr[i];
                counter++;
            }else{
                counter++;
                temp[counter]=expr[i];
                    counter++;
            }
            }else{
                temp[counter]=expr[i];
                counter++;
            }
        }
        else{
        if(temp[counter]===undefined) temp[counter]=expr[i];
        else temp[counter]+=expr[i];
        }
    }

    while (k < temp.length)
    {
        if (temp[k] != '(' && temp[k] != ')' && temp[k]!='+' && temp[k]!='-' && temp[k]!='/' && temp[k]!='*') 
        {
            Out[counter_out]= temp[k];
            counter_out++;
        }
        if (temp[k] == '(') Stack.push(temp[k]);
        if (temp[k] == ')')
        {
            while (Stack[Stack.length-1] != '(')  {
                Out[counter_out]= Stack.pop();
                counter_out++;
            }
            Stack.pop();
        }
        if (temp[k] == '+' || temp[k] == '-' || temp[k] == '*' || temp[k] == '/')
        {
            while (Stack.length!= 0  && Priority(Stack[Stack.length-1]) >= Priority(temp[k])){
                Out[counter_out]= Stack.pop();
                counter_out++;
            }
            Stack.push(temp[k]);
        }
        k++;
    }
    while (Stack.length != 0) {
        Out[counter_out]= Stack.pop();
        counter_out++;
    }
    temp=[];
   

	 for (let i = 0; i < Out.length; i++)
	{
		if (Out[i] != '-' && Out[i] != '+' && Out[i] != '*' && Out[i] != '/') temp.push(Out[i]);
		else
		{
			oper2=temp.pop();
			oper1=temp.pop();
			switch (Out[i])
			{
			case '+':rezult = Number(oper1) + Number(oper2); break;
			case '-':rezult = Number(oper1) - Number(oper2); break;
			case '*':rezult = Number(oper1) * Number(oper2); break;
            case'/':
            if(oper2==0) throw new Error("TypeError: Division by zero.");
            rezult = Number(oper1) / Number(oper2); break;
			}
			temp.push(rezult);
		}
    }

    return temp[0]; 
}
function Priority(a)
{
	switch (a)
	{
	case '*':case '/':return 3;
	case '+':case '-':return 2;
	case '(':return 1;
	}
	return 0;
}


module.exports = {
    expressionCalculator
}