from django.db import IntegrityError
from django.utils.translation import ugettext_lazy as _
from django.core.exceptions import ValidationError

import re


def is_empty(value):
    if len(value) == 0:
        return True
    else:
        return False


class Cnpj:
    def __init__(self):
        """
        Class to interact with Cnpj brazilian numbers
        """
        pass

    def validate(self, cnpj):
        """
        Method to validate brazilian cnpjs
        Tests:

        print Cnpj().validate('61882613000194')
        True
        print Cnpj().validate('61882613000195')
        False
        print Cnpj().validate('53.612.734/0001-98')
        True
        print Cnpj().validate('69.435.154/0001-02')
        True
        print Cnpj().validate('69.435.154/0001-01')
        False
        """
        # defining some variables
        lista_validacao_um = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
        lista_validacao_dois = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

        # cleaning the cnpj
        cnpj = cnpj.replace("-", "")
        cnpj = cnpj.replace(".", "")
        cnpj = cnpj.replace("/", "")

        # finding out the digits
        verificadores = cnpj[-2:]

        # verifying the lenght of the cnpj
        if len(cnpj) != 14:
            return False

        # calculating the first digit
        soma = 0
        id = 0
        for numero in cnpj:

            # to do not raise indexerrors
            try:
                lista_validacao_um[id]
            except:
                break

            soma += int(numero) * int(lista_validacao_um[id])
            id += 1

        soma = soma % 11
        if soma < 2:
            digito_um = 0
        else:
            digito_um = 11 - soma

        digito_um = str(digito_um)  # converting to string, for later comparison

        # calculating the second digit
        # suming the two lists
        soma = 0
        id = 0

        # suming the two lists
        for numero in cnpj:

            # to do not raise indexerrors
            try:
                lista_validacao_dois[id]
            except:
                break

            soma += int(numero) * int(lista_validacao_dois[id])
            id += 1

        # defining the digit
        soma = soma % 11
        if soma < 2:
            digito_dois = 0
        else:
            digito_dois = 11 - soma

        digito_dois = str(digito_dois)

        # returnig
        return bool(verificadores == digito_um + digito_dois)

    def format(self, cnpj):
        """
        Method to format cnpj numbers.
        Tests:

        print Cnpj().format('53612734000198')
        53.612.734/0001-98
        """
        return "%s.%s.%s/%s-%s" % (cnpj[0:2], cnpj[2:5], cnpj[5:8], cnpj[8:12], cnpj[12:14])


class Cpf:
    def __init__(self):
        """
        Class to interact with Cpf brazilian numbers
        """
        pass

    def validar_cpf(self, value):
        cpf = value
        # Verifica a formatação do CPF
        if not re.match(r'\d{3}\.\d{3}\.\d{3}-\d{2}', cpf):
            return False

        # Obtém apenas os números do CPF, ignorando pontuações
        numbers = [int(digit) for digit in cpf if digit.isdigit()]

        # Verifica se o CPF possui 11 números:
        if len(numbers) != 11:
            return False

        # Validação do primeiro dígito verificador:
        sum_of_products = sum(a*b for a, b in zip(numbers[0:9], range(10, 1, -1)))
        expected_digit = (sum_of_products * 10 % 11) % 10
        if numbers[9] != expected_digit:
            return False

        # Validação do segundo dígito verificador:
        sum_of_products = sum(a*b for a, b in zip(numbers[0:10], range(11, 1, -1)))
        expected_digit = (sum_of_products * 10 % 11) % 10
        if numbers[10] != expected_digit:
            return False

        return True


def contain_numbers(value):
    return check_pattern(r'\d', value)


def contain_alpha(value):
    return check_pattern(r'[a-zA-Z]', value)


def check_pattern(pattern, value):
    if re.search(pattern, value):
        return True
    else:
        return False


def formatar_cpf(cpf):
    novo_cpf = cpf[:3]+"."+cpf[3:6]+"."+cpf[6:9]+"-"+cpf[9:]
    return novo_cpf


def formatar_cnpj(cnpj):
    novo_cnpj = cnpj[:2]+"."+cnpj[2:5]+"."+cnpj[5:8]+"/"+cnpj[8:12]+"-"+cnpj[12:]
    return novo_cnpj


def formatar_cpfcnpj(codigo):
    if len(codigo) == 11:
        return formatar_cpf(codigo)
    else:
        return formatar_cnpj(codigo)


def validar_registro(registro):
    msg = ""
    try:
        registro.full_clean()
        msg = "SUCESSO"

    except ValidationError as excecao:
        msg = "Erro! " + excecao.message

    except IntegrityError as excecao:
        if "cpf_cnpj" in excecao.args[0]:
            msg = "Erro! cpf ou cnpj já existe no cadastro!"

        else:
            msg = excecao.args[0]

        return msg, ""

    finally:
        return False, ""
