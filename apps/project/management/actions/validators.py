from django.utils.translation import ugettext_lazy as _
from django.core.exceptions import ValidationError
from django.core.validators import EmailValidator
import re


email_format_validator = EmailValidator(message="Erro! Email inválido.")


def check_islogged(request):
    if request.user.is_authenticated:
        return True
    else:
        return False


def password_format_validator(value):
    if is_empty(value) or not contain_minimal_size(value,8) or not contain_alpha(value) or not contain_numbers(value):
        raise ValidationError(_('Password must be 8 characters or more with numbers and letters'),code='invalid')


def check_password_format(value):
    if value is not None and not is_empty(value) and contain_minimal_size(value, 8) and contain_numbers(value) and contain_alpha(value):
        return True
    else:
        return False


def contain_minimal_size(value,size):
    return check_pattern(r'\w{'+str(size)+',}', value)


def contain_numbers(value):
    return check_pattern(r'\d', value)


def contain_alpha(value):
    return check_pattern(r'[a-zA-Z]', value)


def check_pattern(pattern,value):
    if re.search(pattern, value):
        return True
    else:
        return False


def is_empty(value):
    if len(value) == 0:
        return True
    else:
        return False


class NumberValidator(object):
    def validate(self, password, user=None):
        if not re.findall('\d', password):
            raise ValidationError(
                _("A senha deve conter pelo menos 1 dígito, 0-9."),
                code='password_no_number',
            )

    def get_help_text(self):
        return _(
            "Sua senha deve conter pelo menos 1 dígito, 0-9."
        )


class UppercaseValidator(object):
    def validate(self, password, user=None):
        if not re.findall('[A-Z]', password):
            raise ValidationError(
                _("A senha deve conter pelo menos uma letra maiúscula, A-Z."),
                code='password_no_upper',
            )

    def get_help_text(self):
        return _(
            "Sua senha deve conter pelo menos uma letra maiúscula, A-Z."
        )


class LowercaseValidator(object):
    def validate(self, password, user=None):
        if not re.findall('[a-z]', password):
            raise ValidationError(
                _("A senha deve conter pelo menos uma letra minúscula, a-z."),
                code='password_no_lower',
            )

    def get_help_text(self):
        return _(
            "Sua senha deve conter pelo menos uma letra minúscula, a-z."
        )


class SymbolValidator(object):
    def validate(self, password, user=None):
        if not re.findall('[()[\]{}|\\`~!@#$%^&*_\-+=;:\'",<>./?]', password):
            raise ValidationError(
                _("A senha deve conter pelo menos 1 símbolo: " +
                  "()[]{}|\`~!@#$%^&*_-+=;:'\",<>./?"),
                code='password_no_symbol',
            )

    def get_help_text(self):
        return _(
            "Sua senha deve conter pelo menos 1 símbolo: " +
            "()[]{}|\`~!@#$%^&*_-+=;:'\",<>./?"
        )
