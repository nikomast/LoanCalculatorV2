from flask import Flask, render_template, request, send_file
from flask_cors import CORS
from flask import Flask, jsonify
# <--- Api kirjastoja. Python kirjastoja -->
import matplotlib.pyplot as plt 
import json
from decimal import Decimal
import matplotlib.pyplot as plt 
import json
from decimal import Decimal
import copy
import tempfile
import os


app = Flask(__name__)
CORS(app)  # This ensures that CORS headers are set for communication between the React and Flask apps

@app.route('/')
def index():
    return "Hello, World!"

@app.route('/api/calculate', methods=['POST'])
def calculate():
    
    data = request.json
    loans = data.get('loans')
    monthly_payment = data.get('monthlyPayment')
    print("")
    # Printing the received data
    #print("Monthly Payment Amount:", monthly_payment)
    for idx, loan in enumerate(loans, start=1):
        print(f"\nLoan {idx}")
        for key, value in loan.items():
            print(f"{key.capitalize()}: {value}")
    response = start(loans, monthly_payment)
    print(response)
    return response


final_loan_costs = {}
loans = {}
history = {}

def done(loans, i):
    for loan in loans:
        print("tuleeko se tänne?")
        if loan['amount'] == 0:
            print(i)
            final_loan_costs[loan["owner"]] = loan["cost"]
            loans.remove(loan)
            #print(json.dumps(loan, cls=DecimalEncoder))

def minumum_payments(sum, loans, i):
     payment = int(sum)
     penalty = 0
     reduction = payment
     cost = 0
     for x in loans:
        print(type(payment))
        print(x)   
        cost += int(x['minimum_payment'])
     #print("Lainojen maksuun tarvittava minimisumma on:", cost)
     if payment >= cost:
         #print("lainojen maksun pitäisi onnistua!")
         for x in loans:
            if x['amount'] < x['minimum_payment']:
                 payment -= x['amount']
                 #print("Maksetaan lainasta", x['owner'], x['amount'], )
                 x['amount'] = 0
                 done(loans, i)
            else:
                x['amount'] -= x['minimum_payment']
                #print("Maksetaan lainasta", x['owner'], x['minimum_payment'])
                payment -= x['minimum_payment']
     else:
         #print("rahat eivät riitä lainojen maksuun!")
         for x in loans:
            #tässä katsotaan pystyykö maskamaan jotain pois
            #print((payment >=  x['amount'] and x['amount'] != 0))
            if payment >=  x['amount'] and x['amount'] != 0:
                 #payment -= x['amount']
                 #print("Maksetaan laina", x['owner'],"kokonaan pois, jonka jälkeen rahaa on jäljellä:", payment)
                 x['amount'] = 0
                 done(loans, i)

         loans = sorted(loans, key=lambda x: x['minimum_payment'], reverse=False)
         for x in loans:
            #tässä katotaan pystyykö maksamaan pakollisia maksuja
                if payment >= x['minimum_payment'] and x['amount'] != 0:
                        payment -= x['minimum_payment']
                        x['amount'] -= x['minimum_payment']
                        #print("Pystytään maksamaan lainasta", x['owner'], "vain minimiosa: ",x['minimum_payment'],", jonka jälkeen rahaa on jäljellä:", payment)

                else:
                    sakko = 5
                    x['amount'] += x['minimum_payment'] + sakko
                    x['fine']  += 1
                    x['cost'] += sakko
                    penalty += x['minimum_payment'] + sakko

     if penalty > reduction:
         print("Lainoja ei saa tällä budjetilla koskaan maksettua")

     done(loans, i)
     loans = sorted(loans, key=lambda x: x['interest'], reverse=True)
     if payment > 0:
        additional_payments(loans, payment, i)

def additional_payments(loans, payment, i):
    print("--------------------------")
    #print("Minimi maksujen jälkeen rahaa jäi:",payment)
    for x in loans:
         if x['amount'] > payment:
            #print("Maksetaan lainasta", x['owner'],"summa", payment)
            x['amount'] -= payment
            payment = 0
         else:
             temp = x['amount']
             x['amount'] = 0
             payment -= temp

         if payment == 0:
            break
    done(loans, i)
    """if payment != 0:
        print("Rahaa jäi: ", payment)"""

def add_intrest(loans):
    for x in loans:
        if x['interest'] != 0:
            interest = x['amount'] * ((x['interest']/12)/100)
            x['amount'] += interest
            x['cost'] += interest

def get_visuals(history, ax1, ax2):

    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 5))  # 1 row, 2 columns

    # First plot: Loan Amount
    for loan_name, amounts in history.items():
        ax1.plot(amounts, label=loan_name)
    ax1.grid(True, which='both', linestyle='--', linewidth=0.5)
    ax1.set_xlabel('Kuukaudet')
    ax1.set_ylabel('Lainan määrä')
    ax1.legend()

    loan_names = list(final_loan_costs.keys())
    costs = list(final_loan_costs.values())
    ax2.bar(loan_names, costs)
    ax2.set_xlabel('Lainat')
    ax2.set_ylabel('Kustannukset')
    ax2.set_title('Lainojen kustannukset')

    # Save the image to the specified directory
    save_directory = "C:\\Users\\n1k0m\\Documents\\LoanCalculatorV2\\Images"
    image_name = "output_image.png"  # or dynamically generate a name if you want
    image_path = os.path.join(save_directory, image_name)
    fig.savefig(image_path)
    return image_path

class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return str(obj)  # or float(obj) if you want to convert to float instead of string
        return super(DecimalEncoder, self).default(obj)

def update_types(loans):
    for loan in loans:
        # Assuming owner remains a string, so we skip it
        loan['amount'] = int(loan['amount'])
        loan['interest'] = int(loan['interest'])
        loan['minimum_payment'] = int(loan['minimum_payment'])
        loan['cost'] = int(loan['cost'])
        loan['fine'] = int(loan['fine'])
    return loans

#monthly_update()
def start(loans, payment):
    final_loan_costs.clear()
    #print(json.dumps(loans, cls=DecimalEncoder))
    loans = sorted(loans, key=lambda x: x['interest'], reverse=True)
    loans = update_types(loans)

    #payment = float(input("Enter the amount you can pay monthly: "))
    temp = {loan["owner"]: [] for loan in loans}
    #loan_cost = {loan["owner"]: [] for loan in loans}
    i = 0
    while len(loans) != 0:
        for loan in loans:
            temp[loan["owner"]].append(int(loan["amount"]))
            history = copy.deepcopy(temp)
        minumum_payments(payment, loans, i)
        add_intrest(loans)
        i += 1
        if i > 120:
            break
    print("done")
    print(history)
    return get_visuals(history, history, final_loan_costs)


if __name__ == '__main__':
    app.run(debug=True)