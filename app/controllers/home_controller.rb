class HomeController < ApplicationController
  def index
  end

  def cal
    principal_amount = params[:loan_amount].to_f
    rate = params[:interest_rate].to_f
    period = params[:tenure].to_i
    home_rate = params[:home_rate].to_f

    a = principal_amount
    r = (rate/100/12)
    h = (home_rate/100/12)
    n = period

    monthly_payment=(r*a)/(1-(1+r)**(-n))

    interest = a * r
    principal = monthly_payment - interest
    house_insurance = a * h


    render json: { 'status' => 'success', 'data' => [principal, interest, house_insurance] }
  end
end